let mongoose = require("mongoose");

let petSchema = new mongoose.Schema({
    customer_id: mongoose.Types.ObjectId,
    name: String,
    code: String,
    remark: String
},{
    collection: 'pet'
})

module.exports = petSchema;