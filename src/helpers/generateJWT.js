const jwt = require('jsonwebtoken');
const { Config } = require('../config/index');

const generateJWT = (id) => {
    return jwt.sign({id}, Config.jwtSecret, {
        expiresIn: "30d",
    })
};

module.exports = generateJWT;