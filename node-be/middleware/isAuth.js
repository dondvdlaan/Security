const jwt = require('jsonwebtoken');


//const logger  = require("../logger/logger");

/**
 * Auth middleware. Check son presence of Headers and x-acces-token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = (req, res, next) => {

    const authHeader = req.headers;

    console.log("\n ****** In is-auth.js ******");
    console.log({authHeader});

    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader["x-access-token"];
    console.log("isAuth token: ", token)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_CODE)
    } catch (err) {
        //logger.error(err);
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.user = decodedToken.user;
    next();
};