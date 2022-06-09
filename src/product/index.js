const express = require('express');
const { ProductController } = require('./controller');
const checkAuth = require('../helpers/authMiddleware');

const router = express.Router();

module.exports.ProductAPI = (app) => {
    router
        .get('/', checkAuth, ProductController.getProducts)
        .get('/:id', checkAuth, ProductController.getProduct)
        .get('/users/:name', ProductController.getProductsUser)
        .post('/', checkAuth, ProductController.createProduct)
        .put("/:id", checkAuth, ProductController.updateProduct)
        .delete("/:id", checkAuth, ProductController.deleteProduct);
    app.use('/api/products', router);
}