const mongoose = require('../db');

const { Schema } = mongoose;

const subdomainSchema = new Schema({
  ips: [String],
  name: String,
});

const addressSchema = new Schema({
  https: Boolean,
  port: Number,
  domain: String,
  subdomains: [subdomainSchema],
  blockedStatus: { type: String, default: 'notBlocked' },
  blockedDate: Date,
  blockedTimePeriod: Number,
});

const Address = mongoose.model('Addresses', addressSchema);

module.exports = Address;
