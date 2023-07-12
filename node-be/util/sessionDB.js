const session       = require("express-session");
const MySQLStore    = require("express-mysql-session")(session);

const dbOptions = {
	host: 'localhost',
	port: 3306,
	user: 'sessionUser',
	password: 'sessionPW',
	database: 'session'
};

// Initialise session store
const sessionStore = new MySQLStore(dbOptions);

sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error("sessionStore: " ,error);
});

module.exports = sessionStore;