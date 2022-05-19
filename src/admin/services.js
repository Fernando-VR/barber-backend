const Admin = require('../models/admin_model');
const Joi = require('joi');

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

const create = async (body) => {
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
    let admin = await Admin.findOneAndUpdate( { "_id" : id }, {
        $set: {
            "name": name,
            "lastName": lastName,
            "email": email,
            "password": password,
            "image": image
        }
    }, {new: true});
    return admin;
}

const deleteA = async (id) => {
    let admin = await Admin.findOneAndDelete( { "_id" : id});
    return admin;
};

module.exports.AdminService = {
    getAll,
    getById,
    create,
    update,
    deleteA,
    schema
};