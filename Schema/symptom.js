let mongoose = require("mongoose");

let symptomSchema = new mongoose.Schema({
    symptom: String,
    pet_id: mongoose.Schema.Types.ObjectId,
},{
    collection: 'symptom'
})

module.exports = symptomSchema;