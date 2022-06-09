const express = require('express');
const { ImageController } = require('./controller');
const checkAuth = require('../helpers/authMiddleware');

const router = express.Router();

module.exports.ImagesAPI = (app) => {
    router
        .get('/', checkAuth, ImageController.getImages)
        .get('/:id', checkAuth, ImageController.getImage)
        .post('/', checkAuth, ImageController.createImage)
        .delete("/:id", checkAuth, ImageController.deleteImage);
    app.use('/api/images', router);
}