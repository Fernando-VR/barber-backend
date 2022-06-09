const createError = require('http-errors');
const debug = require('debug')('app:module-admin-controller');
const Admin = require('../models/admin_model');

const { AdminService } = require('./services');
const { Response } = require('../common/response');
const generateJWT = require('../helpers/generateJWT');
// const { schema } = require('../models/admin_model');

module.exports.AdminController = {
    getAdmins: (req, res) => {
        let admins = AdminService.getAll();
        admins
            .then( admins => {
                Response.success(res, 200, 'Admin list', admins);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    getAdmin: async (req, res) => {
        const { params: { id }} = req
        let admin = AdminService.getById( id );
        admin
            .then( admin => {
                Response.success(res, 200, 'Admin', admin);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    verifyAdmin: async (req, res) => {
        const { params: { name }} = req
        let admin = AdminService.getByName( name );
        admin
            .then( admin => {
                Response.success(res, 200, 'Admin', admin);
            })
            .catch ( error => {
                debug(error);
                Response.error(res);
            })
    },
    createAdmin: (req, res) => {
        let { body } = req;
        let { name, lastName, email, password, image } = body;
        const { error, value } = AdminService.schema.validate({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            image: image
        })
        if ( !error ){
            let newAdmin = AdminService.create(body);
            newAdmin
                .then( admin => {
                    Response.success(res, 201, `Admin added`, admin);
                })
                .catch (error => {
                    debug(error);
                    Response.error(res, error);
                });
        }
        else {
            debug(error);
            Response.errorJoi(res, 400, error);
        }
    },
    updateAdmin: async (req, res) => {
        const { params : {id} } = req;
        const { body } = req;
        let { name, lastName, email, password, image } = body;
        const { error, value } = AdminService.schema.validate({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            image: image
        })
        if ( !error ){
            let admin = AdminService.update(id, value);
            admin
                .then( admin => {
                    Response.success(res, 200, `Admin modified`, admin);
    
                })
                .catch( error  => {
                    debug(error);
                    Response.error(res, error);
                });
        }
        else {
            debug(error);
            Response.errorJoi(res, 400, error);
        }
        
    },
    deleteAdmin: async (req, res) => {
        const { params: {id} } = req;
        const deleted = AdminService.deleteA(id);
        deleted
            .then( admin => {
                if ( !admin )
                    Response.error(res, new createError.NotFound());
                else
                    Response.success(res, 200, `Admin deleted`, admin);
            })
            .catch( error => {
                debug(error);
                Response.error(res);
            });
    },
    authentication: async (req, res) => {
        const { email, password } = req.body;
        try {
            const admin = await AdminService.getByEmail(email);
            if( await admin.checkPassword(password) ){
                res.json({
                    body: {
                        _id: admin._id,
                        name: admin.name,
                        email: admin.email,
                        token: generateJWT(admin.id)
                    }
                })
            }
            else {
                const error = new Error('Invalid Password');
                return res.status(403).json({ msg: error.message });
            } 
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
        
    },
    profile: (req, res) => {
        const { admin } = req;
        res.json(admin);
    }
}