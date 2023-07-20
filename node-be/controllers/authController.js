const passport          = require("passport");
const generateJwtAccess = require("../middleware/generateJWTAccess");
const generateJwtSecret = require("../middleware/generateJWTSecret");
const sameOrigin        = require("../middleware/sameOrigin");
const isAuth            = require("../middleware/isAuth");
const {refreshToken,
    createSession }      = require("./authRoute")

const authController = (server) =>{

    server.post('/api/auth/refresh', 
        sameOrigin,
        refreshToken()
    ),

    server.post('/api/auth', 
        sameOrigin,
        passport.authenticate('local', {
            //successReturnToOrRedirect: 'http://localhost:4500/api/auth/cb',
            failureRedirect: 'http://localhost:4500/api/auth/cb/err',
            failureMessage: true
        }), 
        createSession()
    ),

    server.get('/api/auth/cb', 
        (req,res) => {
          
            console.log("\n ******* in cb ****** \n")
            //console.log("\n cb req \n", req)

           
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

module.exports = authController;