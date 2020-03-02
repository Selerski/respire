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
  blocked: { type: Boolean, default: false },
});

const Address = mongoose.model('Addresses', addressSchema);

module.exports = Address;
