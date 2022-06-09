const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

adminSchema.pre("save", async function (next) {
    if ( !this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.checkPassword = async function( passwordForm ){
    return await bcrypt.compare(passwordForm, this.password);
}

module.exports = mongoose.model('Admin', adminSchema);