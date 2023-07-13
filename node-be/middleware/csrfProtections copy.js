const { doubleCsrf } = require("csrf-csrf");

/**
 * CSRF Protection
 */

//const csrfProtection = () =>{

const { generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => "this is a test", // NEVER DO THIS
    //cookieName: "x-csrf-test", // Prefer "__Host-" prefixed names if possible
    //cookieOptions: { sameSite: false, secure: false, signed: true }, // not ideal for production, development only
    ignoredMethods: ["GET", "HEAD", "OPTIONS"], // A list of request methods that will not be protected.
    getTokenFromRequest: (req) => req.headers["x-csrf-test"], // A function that returns the token from the request

  });


//}



module.exports = {generateToken, doubleCsrfProtection}
