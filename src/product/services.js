const Product = require('../models/product_model');
const Admin = require('../models/admin_model');
const createError = require('http-errors');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    price: Joi.number()
            .required(),
    description: Joi.string()
                    .min(10)
                    .max(250)
                    .required(),
    stock: Joi.number()
            .integer()
            .required(),
    image: Joi.string()
            .required()
                
});

const getAll = async (admin) => {
    let products = await Product.find().where("admin").equals(admin);
    return products;
};

const getAllUser = async (name) => {
    let admin = await Admin.findOne( { name } );
    let products = await Product.find({ "admin" : admin._id });
    return products;
};

const getById = async (id, admin_id) => {
    let product = await Product.findById(id);
    if (!product){
        throw new createError(400, `Not found`);
    }
    if( product.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    return product;
}

const create = async (id, body) => {
    let product = new Product({
        name: body.name,
        price: body.price,
        description: body.description,
        stock: body.stock,
        image: body.image,
    });
    product.admin = id;
    return await product.save();
}

const update = async (id, {name, price, description, stock, image}, admin_id ) => {
    const product = await Product.findById( id );
    if (!product){
        throw new createError(400, `Not found`);
    }
    if( product.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock;
    product.image = image || product.image;
    const newProduct = await product.save();
    return newProduct;
}

const deleteP = async (id, admin_id) => {
    const product = await Product.findById( id );
    if (!product){
        throw new createError(400, `Not found`);
    }
    if( product.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    const newProduct = await Product.findOneAndDelete( { "_id" : id});
    return newProduct;
};

module.exports.ProductService = {
    getAll,
    getAllUser,
    getById,
    create,
    update,
    deleteP,
    schema
};