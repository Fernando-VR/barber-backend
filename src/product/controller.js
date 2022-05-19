const createError = require('http-errors');
const debug = require('debug')('app:module-product-controller');

const { AdminService, ProductService } = require('./services');
const { Response } = require('../common/response');
const { create } = require('../models/admin_model');
// const { schema } = require('../models/admin_model');

module.exports.ProductController = {
    getProducts: (req, res) => {
        let products = ProductService.getAll();
        products
            .then( products => {
                Response.success(res, 200, 'Products list', products);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    getProduct: async (req, res) => {
        const { params: { id }} = req
        let product = ProductService.getById( id );
        product
            .then( product => {
                Response.success(res, 200, 'Product', product);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    createProduct: (req, res) => {
        let { body } = req;
        let { name, price, description, stock, image } = body
        const { error, value } = ProductService.schema.validate({
            name: name,
            price: price,
            description: description,
            stock: stock,
            image: image
        });
        if ( !error ) {
            let newProduct = ProductService.create(body);
            newProduct
                .then( product => {
                    Response.success(res, 201, `Product added`, product);
                })
                .catch (error => {
                    debug(error);
                    Response.error(res);
                });
        }
        else {
            debug(error);
            Response.errorJoi(res, 400, error);
        }
        
    },
    updateProduct: async (req, res) => {
        const { params : {id} } = req;
        const { body } = req;
        let { name, price, description, stock, image } = body
        const { error, value } = ProductService.schema.validate({
            name: name,
            price: price,
            description: description,
            stock: stock,
            image: image
        });
        if ( !error ){
            let product = ProductService.update(id, value);
            product
                .then( product => {
                    Response.success(res, 200, `Product modified`, product);

                })
                .catch( error  => {
                    debug(error);
                    Response.error(res);
                });
        }
        else {
            debug(error);
            Response.errorJoi(res, 400, error);
        }
        
    },
    deleteProduct: async (req, res) => {
        const { params: {id} } = req;
        const deleted = ProductService.deleteP(id);
        deleted
            .then( product => {
                if ( !product )
                    Response.error(res, new createError.NotFound());
                else
                    Response.success(res, 200, `Product deleted`, product);
            })
            .catch( error => {
                debug(error);
                Response.error(res);
            });
    }
}