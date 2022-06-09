const jwt = require('jsonwebtoken');
const Admin = require('../models/admin_model');
const { Config } = require('../config/index');

const checkAuth = async (req, res, next ) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, Config.jwtSecret);
        req.admin = await Admin.findById(decoded.id).select("-password");
        return next();
      } catch (error) {
        const e = new Error("Invalid Token");
        return res.status(403).json({ msg: e.message });
      }
    }
    if (!token) {
        const error = new Error("Invalid or non-existent token");
        return res.status(403).json({ msg: error.message });
    }
    next();

}

module.exports = checkAuth;