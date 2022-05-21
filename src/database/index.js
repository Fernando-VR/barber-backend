const mongoose = require('mongoose');
const debug = require('debug')('app:server-database');

module.exports.ConnectionDb = (app) => {    
    // Online
    // const uri = `mongodb+srv://root:root@cluster0.4bo8b.mongodb.net/?retryWrites=true&w=majority`
    // mongoose.connect(uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    //     .then( () => debug('Connect to MongoDB!'))
    //     .catch( (error) => debug(error));
    // Local
    mongoose.connect('mongodb://localhost:27017/barber')
        .then( () => debug('Connect to MongoDB!'))
        .catch( (error) => debug(error));
}