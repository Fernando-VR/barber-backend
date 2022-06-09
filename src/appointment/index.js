const express = require('express');
const { AppointmentController } = require('./controller');
const checkAuth = require('../helpers/authMiddleware');

const router = express.Router();

module.exports.AppointmentAPI = (app) => {
    router
        .post('/', checkAuth, AppointmentController.createAppointment)
        .post('/users/:name', AppointmentController.createAppointmentUser)
        .get('/', checkAuth, AppointmentController.getAppointments)
        .get('/:id', checkAuth, AppointmentController.getAppointment)
        .put("/:id", checkAuth, AppointmentController.updateAppointment)
        .delete("/:id", checkAuth, AppointmentController.deleteAppointment);
    app.use('/api/appointments', router);
}