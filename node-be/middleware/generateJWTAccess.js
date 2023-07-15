const jwt = require('jsonwebtoken');

/**
 * Generate JWT Access Token
 */
const generateJwtAccess = function (userID) {
    return jwt.sign(
        { userID }, 
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "30s" }
        )
};

module.exports = generateJwtAccess;