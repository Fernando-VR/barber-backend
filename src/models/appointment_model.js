const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    service:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);