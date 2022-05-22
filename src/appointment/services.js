const Appointment = require('../models/appointment_model');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    phone: Joi.number()
            .required(),
    service: Joi.string()
                    .min(3)
                    .max(250)
                    .required(),
    date: Joi.string()
            .required(),
    time: Joi.string()
            .required(),
});

const getAll = async () => {
    let appointments = await Appointment.find()
    return appointments;
};

const getById = async (id) => {
    let appointment = await Appointment.find( { "_id": id} );
    return appointment;
}

const create = async (body) => {
    let appointment = new Appointment({
        name: body.name,
        phone: body.phone,
        service: body.service,
        date: body.date,
        time: body.time
    });
    return await appointment.save();
}

const update = async (id, {name, phone, service, date, time} ) => {
    let appointment = await Appointment.findOneAndUpdate( { "_id" : id }, {
        $set: {
            "name": name,
            "phone": phone,
            "service": service,
            "date": date,
            "time": time
        }
    }, {new: true});
    return appointment;
}

const deleteA = async (id) => {
    let appointment = await Appointment.findOneAndDelete( { "_id" : id});
    return appointment;
};

module.exports.AppointmentService = {
    getAll,
    getById,
    create,
    update,
    deleteA,
    schema
};