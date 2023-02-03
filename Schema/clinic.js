let {Schema} = require('mongoose')

let clinicSchema = new Schema({
    name: String,
    tel: String,
    tax: String,
    address: String
  },{collation:'clinic'});

  module.exports = clinicSchema 