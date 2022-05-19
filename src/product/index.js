const express = require('express');
const { AdminController, ProductController } = require('./controller');

const router = express.Router();

module.exports.ProductAPI = (app) => {
    router
        .get('/', ProductController.getProducts)
        .get('/:id', ProductController.getProduct)
        .post('/', ProductController.createProduct)
        .put("/:id", ProductController.updateProduct)
        .delete("/:id", ProductController.deleteProduct);
    app.use('/api/products', router);
}