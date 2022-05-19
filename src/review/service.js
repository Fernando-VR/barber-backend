const Review = require('../models/review_model');
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

const getAll = async () => {
    let reviews = await Review.find();
    return reviews;
};

const getById = async (id) => {
    let review = await Review.find( { "_id": id} );
    return review;
}

const create = async (body) => {
    let review = new Review({
        name: body.name,
        comment: body.comment,
        evaluation: body.evaluation
    });
    return await review.save();
}

const update = async (id, {name, comment, evaluation} ) => {
    let review = await Review.findOneAndUpdate( { "_id" : id }, {
        $set: {
            "name": name,
            "comment": comment,
            "evaluation": evaluation
        }
    }, {new: true});
    return review;
}

const deleteR = async (id) => {
    let review = await Review.findOneAndDelete( { "_id" : id});
    return review;
};

module.exports.ReviewService = {
    getAll,
    getById,
    create,
    update,
    deleteR,
    schema
};