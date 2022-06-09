const Review = require('../models/review_model');
const Admin = require('../models/admin_model');
const createError = require('http-errors');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    comment: Joi.string()
                    .min(3)
                    .max(250)
                    .required(),
    evaluation: Joi.number()
                    .min(0)
                    .max(5)
                    .required(),
});

const getAll = async ( admin ) => {
    let reviews = await Review.find().where("admin").equals(admin);
    return reviews;
};

const getAllUser = async ( name ) => {
    let admin = await Admin.findOne( { name });
    let reviews = await Review.find( { "admin": admin._id } );
    return reviews;
};

const getById = async ( id, admin_id ) => {
    let review = await Review.findById( id );
    if (!review){
        throw new createError(400, `Not found`);
    }
    if( review.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    return review;
}

const create = async (id, body) => {
    let review = new Review({
        name: body.name,
        comment: body.comment,
        evaluation: body.evaluation
    });
    review.admin = id;
    return await review.save();
}

const createUser = async (name, body) => {
    let admin = await Admin.findOne( { name });
    let review = new Review({
        name: body.name,
        comment: body.comment,
        evaluation: body.evaluation
    });
    review.admin = admin._id;
    return await review.save();
}

const update = async (id, {name, comment, evaluation}, admin_id ) => {
    const review = await Review.findById(id);
    if (!review){
        throw new createError(400, `Not found`);
    }
    if( review.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    review.name = name || review.name;
    review.comment = comment || review.comment;
    review.evaluation = evaluation || review.evaluation;
    const newReview = await review.save();
    return newReview;
}

const deleteR = async ( id, admin_id ) => {
    const review = await Review.findById(id);
    if (!review){
        throw new createError(400, `Not found`);
    }
    if( review.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    const newReview = await Review.findOneAndDelete( { "_id" : id } );
    return newReview;
};

module.exports.ReviewService = {
    getAll,
    getAllUser,
    getById,
    create,
    createUser,
    update,
    deleteR,
    schema
};