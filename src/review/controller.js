const createError = require('http-errors');
const debug = require('debug')('app:module-review-controller');

const { ReviewService } = require('./service');
const { Response } = require('../common/response');

module.exports.ReviewController = {
    getReviews: (req, res) => {
        let result = ReviewService.getAll();
        result
            .then( reviews => {
                Response.success(res, 200, 'Reviews list', reviews);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    getReview: (req, res) => {
        const { params: { id }} = req
        let result = ReviewService.getById( id );
        result
            .then( review => {
                Response.success(res, 200, 'Review', review);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    createReview: (req, res) => {
        let { body } = req;
        let { name, comment, evaluation } = body
        const { error, value } = ReviewService.schema.validate({
            name: name,
            comment: comment,
            evaluation: evaluation
        });
        if ( !error ) {
            let result = ReviewService.create(value);
            result
                .then( review => {
                    Response.success(res, 201, `Review added`, review);
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
    updateReview: (req, res) => {
        const { params : {id} } = req;
        const { body } = req;
        let { name, comment, evaluation} = body
        const { error, value } = ReviewService.schema.validate({
            name: name,
            comment: comment,
            evaluation: evaluation
        });
        if ( !error ){
            let result = ReviewService.update(id, value);
            result
                .then( review => {
                    Response.success(res, 200, `Review modified`, review);

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
    deleteReview: (req, res) => {
        const { params: {id} } = req;
        const result = ReviewService.deleteR(id);
        result
            .then( review => {
                if ( !review )
                    Response.error(res, new createError.NotFound());
                else
                    Response.success(res, 200, `Review deleted`, review);
            })
            .catch( error => {
                debug(error);
                Response.error(res);
            });
    }
}