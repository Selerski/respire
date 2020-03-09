const Address = require('../models/address');

exports.getAddresses = async (model=Address, ctx) => {
  const addresses = await model.find();
  ctx.body = addresses;
};

exports.getAddress = async (model=Address, ctx) => {
  const address = await model.findById(ctx.params.id);
  ctx.body = address;
};

exports.blockAddress = async (model=Address, ctx) => {
  const address = await model.findById(ctx.params.id);
  address.blockedStatus = 'Blocked';
  await address.save();
  ctx.body = address;
};

exports.unblockAddress = async (model=Address, ctx) => {
  const address = await model.findById(ctx.params.id);
  address.blockedStatus = 'notBlocked';
  await address.save();
  ctx.body = address;
};

exports.timeBlockAddress = async (model=Address, date=Date.now(), ctx) => {
  const address = await model.findById(ctx.params.id);
  address.blockedStatus = 'timeBlocked';
  address.blockedDate = date;
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
  // else {
  //   console.log('Already saved', dbAddress.domain);
  // }
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
