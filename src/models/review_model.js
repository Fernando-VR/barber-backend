const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    evaluation:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Review', reviewSchema);