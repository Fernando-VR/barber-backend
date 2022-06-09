const Admin = require('../models/admin_model');
const Joi = require('joi');
const createError = require('http-errors');

const schema = Joi.object({
    name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    lastName: Joi.string()
                .min(3)
                .max(30)
                .required(),
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'mx'] } })
            .required(),
    password: Joi.string()
                .min(5)
                .required(),
    image: Joi.string()
            .required()
});

const getAll = async () => {
    let admins = Admin.find();
    return admins;
};

const getById = async (id) => {
    let admin = Admin.find( { "_id": id} );
    return admin;
}

const getByName = async ( name ) => {
    let admin = Admin.findOne( { "name" : name } );
    return admin;
}

const getByEmail = async (email) => {
    let admin = await Admin.findOne( { email });
    if ( !admin ){
        throw new createError(400, `User doesn't exist`);
    }
    return admin;
}

const create = async (body) => {
    const repeatedAdmin = await Admin.findOne({ "email": body.email });
    if(repeatedAdmin){
        throw new createError(400, `Email already registered`);
    }
    let admin = new Admin({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        image: body.image
    });
    return await admin.save();
}

const update = async (id, {name, lastName, email, password, image} ) => {
    const admin = await Admin.findById(id);
    if(!admin){
        throw new createError(400, `Not found`);
    }
    if(admin.email !== email){
        const repeatEmail = await Admin.findOne({email})
        if(repeatEmail)
            throw new createError(400, `Email already registered`);
    }
    admin.name = name;
    admin.lastName = lastName;
    admin.email = email;
    admin.password = password;
    admin.image = image;
    const newAdmin = await admin.save();
    return newAdmin;
}

const deleteA = async (id) => {
    let admin = await Admin.findOneAndDelete( { "_id" : id});
    return admin;
};

module.exports.AdminService = {
    getAll,
    getById,
    getByName,
    getByEmail,
    create,
    update,
    deleteA,
    schema
};