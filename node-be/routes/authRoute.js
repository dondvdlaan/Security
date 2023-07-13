const passport          = require("passport");
const generateJwtAccess = require("../middleware/generateJWTAccess");
const sameOrigin        = require("../middleware/sameOrigin");
const {generateToken, 
	doubleCsrfProtection}	= require("../middleware/csrfProtections.js");


const authRoute = (server) =>{


    server.post('/api/auth', sameOrigin,
    
    passport.authenticate('local', {
        //successReturnToOrRedirect: 'http://localhost:4500/api/auth/cb',
        failureRedirect: 'http://localhost:4500/api/auth/cb/err',
        failureMessage: true
    }), 
    (req,res) => {

        console.log("\n ****** in authRoute ****** " )
        console.log("auth", req.user[0].userID)
        
        // userID is converted in JWR token
        const jwtAccess = generateJwtAccess(req.user[0].userID);
        //console.log({jwt_access})

        /*
        res.cookie("X-XSRF-TOKEN", "XSRF-TOKEN-TEST", {
            path: "/",
            httpOnly: false,
        });
        */
        res.cookie("JWT_ACCESS", jwtAccess, {
            maxAge: 60 * 60 * 24 * 1000,
            path: "/",
            httpOnly: false,
        });
      

        res.status(200).send("Authorization OK")
    }),

    server.get('/api/auth/cb', 
        (req,res) => {
          
            console.log("\n ******* in cb ****** \n")
            //console.log("\n cb req \n", req)

    /*
            res.cookie("TESTAUTH", "TESTABCAUTH", {
                path: "/",
                httpOnly: false,
            });
            */
            res.status(200).send("todo bien")
        }
    ),

    server.get('/api/auth/cb/err', 
    (req,res) => {
      
        res.status(401).send(req.session.messages[0])
        console.log("in err: ", req.session.messages[0])
    }
)

}

module.exports = authRoute;