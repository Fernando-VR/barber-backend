const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});

module.exports = mongoose.model('Image', imageSchema);