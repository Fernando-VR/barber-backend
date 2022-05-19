const express = require('express');
const { AdminController } = require('./controller');

const router = express.Router();

module.exports.AdminAPI = (app) => {
    router
        .get('/', AdminController.getAdmins) // No pasar la ejecucion de la funcion, si no el callback
        .get('/:id', AdminController.getAdmin)
        .post('/', AdminController.createAdmin)
        .put("/:id", AdminController.updateAdmin)
        .delete("/:id", AdminController.deleteAdmin);
    app.use('/api/admins', router);
}