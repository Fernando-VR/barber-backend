const express = require('express');
const { ReviewController } = require('./controller');
const checkAuth = require('../helpers/authMiddleware');

const router = express.Router();

module.exports.ReviewAPI = (app) => {
    router
        .get('/', checkAuth, ReviewController.getReviews)
        .get('/:id', checkAuth, ReviewController.getReview)
        .get('/users/:name', ReviewController.getReviewsUser)
        .post('/', checkAuth, ReviewController.createReview)
        .post('/users/:name', ReviewController.createReviewUser)
        .put("/:id", checkAuth, ReviewController.updateReview)
        .delete("/:id", checkAuth, ReviewController.deleteReview);
    app.use('/api/reviews', router);
}