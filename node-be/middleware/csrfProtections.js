const csrf = require("csurf");

/**
 * CSRF Protection
 */

module.exports = csrf({ cookie: true });
