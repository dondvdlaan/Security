const jwt = require('jsonwebtoken');

/**
 * Generate JWT Refresh Token
 */
const generateJwtRefresh = function (userID) {
    return jwt.sign(
        { userID }, 
        process.env.JWT_REFRESH_SECRET)
};

module.exports = generateJwtRefresh;