const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;


//const logger  = require("../logger/logger");

/**
 * Auth middleware. Checks on presence of Headers and x-acces-token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = (req, res, next) => {

    const authHeader = req.headers;

    console.log("\n ****** In is-auth.js ******");
    console.log({authHeader});
    console.log("\n Req");
    console.log(req.sessionID);
    console.log(req.session);

    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader["x-access-token"];
    console.log("isAuth token: ", token)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    } catch (err) {
        //logger.error(err);
        if (err instanceof TokenExpiredError) {
            return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
          }
        /*
        console.log("jwt verify err: ", err)
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;*/
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.user = decodedToken.user;
    next();
};