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
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});

module.exports = mongoose.model('Review', reviewSchema);