let {Schema, version} = require('mongoose')

let customerSchema = new Schema({
    code: String,
    name: String,
    email: String,
    tel: String,
    lineId: String,
    address: String
  },
  {
    collection:'customer',
    versionKey: false
  }
  );

  module.exports = customerSchema 