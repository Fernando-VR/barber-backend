const express = require('express');
const { ReviewController } = require('./controller');

const router = express.Router();

module.exports.ReviewAPI = (app) => {
    router
        .get('/', ReviewController.getReviews)
        .get('/:id', ReviewController.getReview)
        .post('/', ReviewController.createReview)
        .put("/:id", ReviewController.updateReview)
        .delete("/:id", ReviewController.deleteReview);
    app.use('/api/reviews', router);
}