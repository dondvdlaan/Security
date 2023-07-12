const passport      = require('passport');
const LocalStrategy = require('passport-local');
const crypto        = require('crypto');

// ---- Modules ----
const userPool		= require('../util/userDB')

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(new LocalStrategy(function verify(userName, password, cb) {

    userPool.execute('SELECT * FROM users WHERE userName = ?', [ userName ], function(err, row) {
      if (err) { return cb(err); }
      if (!row.length) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      
      //console.log({row})
      let _salt           = row[0].salt
      let _hashedPassword = row[0].hashedPassword
      //console.log({password})

      crypto.pbkdf2(password, _salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(_hashedPassword, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }

        return cb(null, row);
      });
    });
  }));

  /* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, that
 * information is stored in the session.
 */
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.userID, username: user.userName });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
