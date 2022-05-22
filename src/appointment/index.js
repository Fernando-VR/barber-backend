const express = require('express');
const { AppointmentController } = require('./controller');

const router = express.Router();

module.exports.AppointmentAPI = (app) => {
    router
        .get('/', AppointmentController.getAppointments)
        .get('/:id', AppointmentController.getAppointment)
        .post('/', AppointmentController.createAppointment)
        .put("/:id", AppointmentController.updateAppointment)
        .delete("/:id", AppointmentController.deleteAppointment);
    app.use('/api/appointments', router);
}