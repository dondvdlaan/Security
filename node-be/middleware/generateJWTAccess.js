const jwt = require('jsonwebtoken');

/**
 * Generate JWT Access Token
 */
const generateJwtAccess = function (user_id) {
    return jwt.sign({ user: user_id }, process.env.REACT_APP_JWT_SECRET_CODE)
};

module.exports = generateJwtAccess;