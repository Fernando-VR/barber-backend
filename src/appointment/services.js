const Appointment = require('../models/appointment_model');
const Admin = require('../models/admin_model');
const createError = require('http-errors');
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

const getAll = async (admin) => {
    const appointments = await Appointment.find().where("admin").equals(admin);
    return appointments;
};

const getById = async (id, admin_id) => {
    let appointment = await Appointment.findById(id);
    if (!appointment){
        throw new createError(400, `Not found`);
    }
    if( appointment.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    return appointment;
}

const create = async (id, body) => {
    let appointment = new Appointment({
        name: body.name,
        phone: body.phone,
        service: body.service,
        date: body.date,
        time: body.time
    });
    appointment.admin = id;
    return await appointment.save();
}

const createUser = async (name, body) => {
    let admin = await Admin.findOne( { name } );
    let appointment = new Appointment({
        name: body.name,
        phone: body.phone,
        service: body.service,
        date: body.date,
        time: body.time
    });
    appointment.admin = admin._id;
    return await appointment.save();
}

const update = async (id, {name, phone, service, date, time}, admin_id ) => {
    const appointment = await Appointment.findById(id);
    if (!appointment){
        throw new createError(400, `Not found`);
    }
    if( appointment.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    appointment.name = name || appointment.name;
    appointment.phone = phone || appointment.phone;
    appointment.service = service || appointment.service;
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    const newAppointment = await appointment.save();
    return newAppointment;
}

const deleteA = async (id, admin_id) => {
    const appointment = await Appointment.findById(id);
    if (!appointment){
        throw new createError(400, `Not found`);
    }
    if( appointment.admin._id.toString() !== admin_id){
        throw new createError(400, `Invalid action`);
    }
    const deletedAppointment = await Appointment.findOneAndDelete( { "_id" : id});
    return deletedAppointment;
};

module.exports.AppointmentService = {
    getAll,
    getById,
    create,
    createUser,
    update,
    deleteA,
    schema
};