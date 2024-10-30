const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    serialNumber: { type: String, required: true },  // New field
    disease: { type: String, required: true },        // New field
    doctor: { type: String, required: true },         // New field
});

const RecordSystem = mongoose.model('Record', recordSchema);
module.exports = RecordSystem;
