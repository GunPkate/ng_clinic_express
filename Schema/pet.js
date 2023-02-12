let {Schema} = require("mongoose");

let petSchema = new Schema({
    _id: String,
    name: String,
    code: String,
    remark: String
},{
    collection: 'pet'
})

module.exports = petSchema;