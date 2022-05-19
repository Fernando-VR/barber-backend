const Product = require('../models/product_model');
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

const getAll = async () => {
    let products = await Product.find();
    return products;
};

const getById = async (id) => {
    let product = await Product.find( { "_id": id} );
    return product;
}

const create = async (body) => {
    let product = new Product({
        name: body.name,
        price: body.price,
        description: body.description,
        stock: body.stock,
        image: body.image,
    });
    return await product.save();
}

const update = async (id, {name, price, description, stock, image} ) => {
    let product = await Product.findOneAndUpdate( { "_id" : id }, {
        $set: {
            "name": name,
            "price": price,
            "description": description,
            "stock": stock,
            "image": image
        }
    }, {new: true});
    return product;
}

const deleteP = async (id) => {
    let product = await Product.findOneAndDelete( { "_id" : id});
    return product;
};

module.exports.ProductService = {
    getAll,
    getById,
    create,
    update,
    deleteP,
    schema
};