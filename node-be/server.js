const express   = require('express');
const server    = express();

const passport      = require('passport');
const session       = require("express-session");
const MySQLStore    = require("express-mysql-session")(session);
const mysql         = require("mysql");

const cors          = require("cors");

const cookieParser  = require("cookie-parser");

require('dotenv').config()

// ---- Modules ----
const sessionStore  	= require('./util/sessionDB');
const controller        	= require('./controllers/controller')
const authController     	= require('./controllers/authController')
// configuration of Passport Authentication  
const auth		    	= require('./conf/auth')
const userPool			= require('./util/userDB')

// ---- Constants ----
const port 			= 4500;
const expiryDate 	= new Date(Date.now() + 60 * 1000) // 1 min
// CORS
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};

// ---- Middleware ----
// req.body is populated 
server.use(express.json());
server.use(cors(corsOptions));
//server.use(cookieParser("some super secret thing, please do not copy this"));

server.use(function(req, res, next) {  
	//res.header('Access-Control-Allow-Origin', "*");
	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "X-XSRF-TOKEN, Origin, X-Requested-With, Content-Type, Accept, Authorization");
	
	//res.header( 'Access-Control-Allow-Credentials',true);
	next();
});

/**
 * Passport - Session is initialized, stores session data on the server; 
 * it only saves the session ID in the cookie itself
 */ 
server.use(session({
	name: "Wat voor naam",
	secret: 'Holita',
	//key: 'session_cookie_name',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie: {
 
		// Session expires after 1 min of inactivity.
		expires: 60000
	}
}));
server.use(passport.session());
server.use(passport.initialize());
//server.use(passport.authenticate('session'));

// ---- Start server ----
const init = () =>{

	// Routes
    authController(server);
    controller(server);

    server.listen(port, err=> console.log(err || `server at ${port}`))
}


init();