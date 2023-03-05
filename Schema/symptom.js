let mongoose = require("mongoose");

let symptomSchema = new mongoose.Schema({
    symptom: String,
    pet_id: mongoose.Schema.Types.ObjectId,
    price: Number,
    remark: String,
    created_at: { type: Date, default: Date.now()}
},{
    collection: 'symptom'
})

module.exports = symptomSchema;