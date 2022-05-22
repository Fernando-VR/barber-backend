const createError = require('http-errors');
const debug = require('debug')('app:module-appointment-controller');

const { AppointmentService } = require('./services');
const { Response } = require('../common/response');

module.exports.AppointmentController = {
    getAppointments: (req, res) => {
        let result = AppointmentService.getAll();
        result
            .then( appointments => {
                Response.success(res, 200, 'Appointments list', appointments);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    getAppointment: async (req, res) => {
        const { params: { id }} = req
        let result = AppointmentService.getById( id );
        result
            .then( appointment => {
                Response.success(res, 200, 'Appointment', appointment);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    createAppointment: (req, res) => {
        let { body } = req;
        let { name, phone, service, date, time } = body
        const { error, value } = AppointmentService.schema.validate({
            name: name,
            phone: phone,
            service: service,
            date: date,
            time: time
        });
        if ( !error ) {
            let newAppointment = AppointmentService.create(value);
            newAppointment
                .then( appointment => {
                    Response.success(res, 201, `Appointment added`, appointment);
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
    updateAppointment: async (req, res) => {
        const { params : {id} } = req;
        const { body } = req;
        let { name, phone, service, date, time } = body
        const { error, value } = AppointmentService.schema.validate({
            name: name,
            phone: phone,
            service: service,
            date: date,
            time: time
        });
        if ( !error ){
            let result = AppointmentService.update(id, value);
            result
                .then( appointment => {
                    Response.success(res, 200, `Appointment modified`, appointment);

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
    deleteAppointment: async (req, res) => {
        const { params: {id} } = req;
        const result = AppointmentService.deleteA(id);
        result
            .then( appointment => {
                if ( !appointment )
                    Response.error(res, new createError.NotFound());
                else
                    Response.success(res, 200, `Appointment deleted`, appointment);
            })
            .catch( error => {
                debug(error);
                Response.error(res);
            });
    }
}