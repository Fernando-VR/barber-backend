const express = require('express');
const { AdminController } = require('./controller');
const checkAuth = require('../helpers/authMiddleware');

const router = express.Router();

module.exports.AdminAPI = (app) => {
    router
        .get('/', AdminController.getAdmins) // No pasar la ejecucion de la funcion, si no el callback
        //.get('/:id', AdminController.getAdmin)
        .post('/', AdminController.createAdmin)
        //.put("/:id", AdminController.updateAdmin)
        .delete("/:id", AdminController.deleteAdmin)
        .post('/login', AdminController.authentication)
        .get('/profile', checkAuth, AdminController.profile)
        .put('/profile/:id', checkAuth, AdminController.updateAdmin)
    app.use('/api/admins', router);
}