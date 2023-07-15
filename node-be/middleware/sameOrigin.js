/**
 * Check same origin in header of request
 */

const sameOrigin = (req, res, next) => {

    console.log("\n ***** in sameOrigin ******")
    console.log(req.headers.origin)

    let originHeader = req.headers

    if (!originHeader) {
        const error = new Error('Access forbidden.');
        error.statusCode = 403.1;
        throw error;
    }

    let clientOrigin = req.headers.origin

    if (clientOrigin != process.env.CLIENT_ORIGIN) {
        const error = new Error('Access forbidden.');
        error.statusCode = 403.1;
        throw error;
    }

    next();
}

module.exports = sameOrigin;
