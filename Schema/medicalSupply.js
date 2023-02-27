let mongoose = require("mongoose");

let medicalSupplySchema = new mongoose.Schema({
    id : String ,
    name : String ,
    remark : String ,
    cost_price : Number ,
    sale_price : Number 
},{
    collection: 'medicalSupply'
})

module.exports = medicalSupplySchema;