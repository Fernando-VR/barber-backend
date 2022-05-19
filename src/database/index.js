const mongoose = require('mongoose');
const debug = require('debug')('app:server-database');

module.exports.ConnectionDb = (app) => {    
    mongoose.connect('mongodb://localhost:27017/barber')
        .then( () => debug('Connect to MongoDB!'))
        .catch( (error) => debug(error));
}