const Address = require('../models/address');

exports.getAddresses = async (model=Address, ctx) => {
  const addresses = await model.find();
  ctx.body = addresses;
};

exports.getAddress = async (ctx) => {
  const address = await Address.findById(ctx.params.id);
  ctx.body = address;
};

exports.blockAddress = async (ctx) => {
  const address = await Address.findById(ctx.params.id);
  address.blockedStatus = 'Blocked';
  await address.save();
  ctx.body = address;
};

exports.unblockAddress = async (ctx) => {
  const address = await Address.findById(ctx.params.id);
  address.blockedStatus = 'notBlocked';
  await address.save();
  ctx.body = address;
};

exports.timeBlockAddress = async (ctx) => {
  const address = await Address.findById(ctx.params.id);
  address.blockedStatus = 'timeBlocked';
  address.blockedDate = Date.now();
  address.blockedTimePeriod = ctx.query.time;
  await address.save();
  ctx.body = address;
};

exports.getOrRegister = async ({ https, port, domain, subdomain, ip }) => {
  let mongoAddress;
  const dbAddress = await Address.findOne({ https, port, domain }, async (err, addr) => {
    if (!addr) {
      mongoAddress = new Address({ 
        https,
        port,
        domain,
        subdomains: [{ name: subdomain, ips: [ip] }],
      });
      await mongoAddress.save();
      // console.log('New address saved!: ', mongoAddress.domain);
    }
  });
  if (mongoAddress) return mongoAddress;
  
  if (dbAddress.subdomains.filter((subd) => subd.name === subdomain).length === 0) { // make this a "find"
    dbAddress.subdomains = [...dbAddress.subdomains, { name: subdomain, ips: [ip] }];
    dbAddress.save();
  } 
  // else if (
  //   dbAddress.subdomains
  //     .filter((subd) => subd.name === subdomain)[0].ips
  //     .filter((subdIp) => subdIp === ip)
  //     .length
  //     === 0) {
  //   dbAddress.subdomains = dbAddress.subdomains.map(sub => {
  //     if (sub.name !== subdomain) return sub
  //     else return {name: subdomain, ips: [...sub.ips, ip] }
  //   });
  //   dbAddress.save();
  //   console.log('Already saved but new IP! ', dbAddress.domain);
  // } 


  else {
    console.log('Already saved', dbAddress.domain);
  }
  return dbAddress;
};

exports.unBlockExpiredAddress = async () => {
  const addresses = await Address.find({ blockedStatus: 'timeBlocked'});
  addresses.forEach((dbAddress) => {
    if (Date.parse(dbAddress.blockedDate) - Date.now() + dbAddress.blockedTimePeriod < 0) {
      // console.log(dbAddress);
      exports.unblockAddress({ params: { id: dbAddress._id } });
    }
  });
};
