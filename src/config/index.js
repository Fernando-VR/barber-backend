require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDBname: process.env.MONGO_DBNAME,
    jwtSecret: process.env.JWT_SECRET
}