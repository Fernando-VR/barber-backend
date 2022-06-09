const Image = require('../models/images_model');
const Admin = require('../models/admin_model');
const createError = require('http-errors');
const Joi = require('joi');

const schema = Joi.object({
    image: Joi.string()
            .required(),
    description: Joi.string()
                    .required()
});

const getAll = async ( admin ) => {
    let images = await Image.find().where("admin").equals(admin);
    return images;
};

const getAllUser = async ( name ) => {
    let admin = await Admin.findOne( { name } );
    let images = await Image.find({ "admin" : admin._id });
    return images;
};

const getById = async ( id, admin_id ) => {
    let image = await Image.findById( id );
    if (!image){
        throw new createError(400, `Not found`);
    }
    if( image.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    return image;
}

const create = async (id, body) => {
    let image = new Image({
        image: body.image,
        description: body.description
    });
    image.admin = id;
    return await image.save();
}

const deleteR = async ( id, admin_id ) => {
    const image = await Image.findById(id);
    if (!image){
        throw new createError(400, `Not found`);
    }
    if( image.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    const deletedImage = await Image.findOneAndDelete( { "_id" : id } );
    return deletedImage;
};

module.exports.ImageService = {
    getAll,
    getAllUser,
    getById,
    create,
    deleteR,
    schema
};