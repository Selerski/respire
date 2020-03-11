const Address = require('../models/address');

exports.getAddresses = async ctx => {
  const addresses = await Address.find();
  ctx.body = addresses;
};

exports.getAddress = async ctx => {
  const address = await Address.findById(ctx.params.id);
  ctx.body = address;
};

exports.blockAddress = async ctx => {
  const address = await Address.findById(ctx.params.id);
  address.blockedStatus = 'Blocked';
  await address.save();
  ctx.body = address;
};

exports.unblockAddress = async ctx => {
  const address = await Address.findById(ctx.params.id);
  address.blockedStatus = 'notBlocked';
  await address.save();
  ctx.body = address;
};

exports.timeBlockAddress = async ctx => {
  const address = await Address.findById(ctx.params.id);
  address.blockedStatus = 'timeBlocked';
  address.blockedDate = date;
  address.blockedTimePeriod = ctx.query.time;
  await address.save();
  ctx.body = address;
};

exports.toggleWidget = async ctx => {
  let input = ctx.params.params.split('&').map((item, index) => {
    return item.split('=')[1];
  });

  const [domain, https, port, blockedStatus] = input;
  const output = { domain, https, port };
  const address = await this.getOrRegister(output);

  ctx.body = address;
};

exports.getOrRegister = async ({ https, port, domain, subdomain, ip }) => {
  let mongoAddress;
  const dbAddress = await Address.findOne(
    { https, port, domain },
    async (err, addr) => {
      if (!addr) {
        mongoAddress = new Address({
          https,
          port,
          domain,
          subdomains: [{ name: subdomain, ips: [ip] }]
        });
        await mongoAddress.save();
      }
    }
  );
  if (mongoAddress) return mongoAddress;

  if (
    dbAddress.subdomains.filter(subd => subd.name === subdomain).length === 0
  ) {
    dbAddress.subdomains = [
      ...dbAddress.subdomains,
      { name: subdomain, ips: [ip] }
    ];
    dbAddress.save();
  }

  return dbAddress;
};

exports.unBlockExpiredAddress = async () => {
  const addresses = await Address.find({ blockedStatus: 'timeBlocked' });
  addresses.forEach(dbAddress => {
    if (
      Date.parse(dbAddress.blockedDate) -
        Date.now() +
        dbAddress.blockedTimePeriod <
      0
    ) {
      exports.unblockAddress({ params: { id: dbAddress._id } });
    }
  });
};
