const jwt = require('jsonwebtoken');
const generateJwtAccess = require("../middleware/generateJWTAccess");
const generateJwtSecret = require("../middleware/generateJWTSecret");

const refreshToken = () => function (req, res, next) {

    console.log("\n ****** in refreshToken ****** " )

    if (req.body.refreshToken == null) {
        throw new Error({
            statusCode: 401,
            message: "Unauthorized"
        });
    }
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            next(new Error({
                statusCode: 403,
                message: "Forbidden"
            })
            );
        }
        console.log("user:", user)
        
        const accessToken = generateJwtAccess(user.userID);
            
        res.send({ accessToken});
    })
}

const createSession = () => (req,res) => {

    console.log("\n ****** in createSession ****** " )
    console.log("auth", req.user[0].userID)
    console.log("body", req.body)

    if(req.session.passport){
        console.log("user", req.session.passport) 
       req.session.passport.user = req.body.username
    }
    else if(!req.session) console.log("session does not exist")
    
    // userID is converted in JWR token
    const jwtAccess = generateJwtAccess(req.user[0].userID);
    const jwtSecret = generateJwtSecret(req.user[0].userID);
    //console.log({jwt_access})

    let session ={
        jwtAccess,
        jwtSecret
    }

    res.send(session)
}

module.exports = {refreshToken, createSession};