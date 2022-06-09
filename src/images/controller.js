const createError = require('http-errors');
const debug = require('debug')('app:module-image-controller');

const { ImageService } = require('./service');
const { Response } = require('../common/response');

module.exports.ImageController = {
    getImages: (req, res) => {
        let result = ImageService.getAll( req.admin );
        result
            .then( images => {
                Response.success(res, 200, 'Images list', images);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    getImage: (req, res) => {
        const { params: { id }} = req;
        let result = ImageService.getById( id, req.admin._id.toString() );
        result
            .then( image => {
                Response.success(res, 200, 'Image', image);
            })
            .catch ( error => {
                debug(error);
                Response.error(res, error);
            })
    },
    createImage: (req, res) => {
        let { body } = req;
        let { image } = body;
        const { error, value } = ImageService.schema.validate( { image } );
        if ( !error ) {
            let result = ImageService.create( req.admin._id, value );
            result
                .then( image => {
                    Response.success(res, 201, `Image added`, image);
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
    updateImage: (req, res) => {
        const { params : {id} } = req;
        const { body } = req;
        let { image } = body
        const { error, value } = ImageService.schema.validate( { image } );
        if ( !error ){
            let result = ImageService.update( id, value, req.admin._id.toString() );
            result
                .then( image => {
                    Response.success(res, 200, `Image modified`, image);
                })
                .catch( error  => {
                    debug(error);
                    Response.error( res, error );
                });
        }
        else {
            debug(error);
            Response.errorJoi(res, 400, error);
        }
        
    },
    deleteImage: (req, res) => {
        const { params: {id} } = req;
        const result = ImageService.deleteR(id, req.admin._id.toString() );
        result
            .then( image => {
                if ( !image )
                    Response.error(res, new createError.NotFound());
                else
                    Response.success(res, 200, `Image deleted`, image);
            })
            .catch( error => {
                debug(error);
                Response.error(res);
            });
    }
}