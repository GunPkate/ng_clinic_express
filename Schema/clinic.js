let {Schema, version} = require('mongoose')

let clinicSchema = new Schema({
    name: String,
    tel: String,
    tax: String,
    address: String
  },
  {
    collection:'clinic',
    versionKey: false
  }
  );

  module.exports = clinicSchema 