const express = require('express');
const createError = require('http-errors');

const { Response } = require('../common/response');

module.exports.IndexAPI = (app) => {
    
    const router = express.Router();
    router.get('/', (req, res) => {
        const menu = {
            users: `https://${req.headers.host}/api/admins`,
            products: `https://${req.headers.host}/api/products`,
            reviews: `https://${req.headers.host}/api/reviews`
        };
        Response.success(res, 200, 'Inventory API', menu)
    });
    app.use('/', router);
}

module.exports.NotFoundAPI = (app) => {
    const router = express.Router();
    router.all('*', (req, res) => {
        Response.error(res, new createError.NotFound());
    });
    app.use('/', router);
}