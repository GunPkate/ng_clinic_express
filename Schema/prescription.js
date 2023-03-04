let mongoose = require("mongoose");

let prescriptionSchema = new mongoose.Schema({
    prescription: mongoose.Schema.Types.ObjectId,
    medicalSupply_id: mongoose.Schema.Types.ObjectId,
    qty: Number,
    remark: String,
    symptom_id: mongoose.Schema.Types.ObjectId,
},{
    collection: 'prescription'
})

module.exports = prescriptionSchema;