Security examples for REACT Frontend, Node and Java/Spring backends

In this building block we show some security techniques for a REACT frontend 
with both a Node and Java backend. The app starts with a username/password
login, which is verified by a Passport-local dependency. The userID is converted in to a
JWT token, which is checked at every request to the backend. Additionally a
a limited XSRF check is conducted on the POST request, when a user logs in.

Furthermore a small exercise has been added with session and cookie(see SESSION and FE-Session).

- The JWT token is being refreshed every x seconds.
- The limited CSRF protection is used for all POST, PUT, DELETE, and PATCH requests.
- A Basic authentication (username/password) with Base64 has been applied for Java/Spring
  backend
  You can test that with
   curl -i --user testUserJava:testPWJava http://localhost:8080/javaBE/auth
- For Java2/Spring backend standard Basic authentication is used only for login and refresh. 
  Subsequent request are authorized with a JWT token. Every x s the JWT token is refreshed.

