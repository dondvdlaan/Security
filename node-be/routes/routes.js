const isAuth            = require("../middleware/isAuth")


const routes = (server) =>{


    server.post('/addUser', (req, res) =>{

        console.log("\n ************ /addUser *********** \n");

        console.log("user:", req.body)

        res.ok.send("User received")

    }),

    server.get('/greeting', 
    isAuth,
     (req, res) =>{

        console.log("\n ************ /greeting *********** \n");

        console.log("\n req ")
        //console.log(req)

        /*
          // Create CSRF token to check POST, PUT, DELETE, and PATCH requests
          res.cookie("XSRF-TOKEN", req.csrfToken(), {
            path: "/",
            httpOnly: false,
        });
        */
        /*
        console.log("\n session data");
        console.log(req.session);

        console.log("session ID");
        console.log(req.sessionID);
        
        //res.cookie("TEST", "TESTABC", {
        //    path: "/",
        //    httpOnly: false,
        //});

        //console.dir("REQ")
        //console.log(req);

        console.log("Headers")
        console.log(req.headers['X-XSRF-TOKEN']);

        console.log("\n req Headers")
        console.log(req.headers);

        //console.dir("Headers token")
        //const authHeader = req.headers;
        //const token = authHeader["authorization"];
        //console.log(token);

        console.log("Session Cookie")
        console.log(req.session.cookie)

        console.log("\n Cookie")
        console.log(req.cookies)
        */
        res.send("Good day")
    }),
    server.get('/greeting2', (req, res) =>{

        console.log("\n ************ /greeting2 *********** \n");

        console.log("\n Cookie2")
        console.log(req.cookies)
       
        res.cookie("3TEST", "3TESTABC", {
            path: "/",
            httpOnly: false,
        });

        res.cookie("X-XSRF-TOKEN", "TESTABC2", {
            path: "/",
            httpOnly: false,
        });

        res.send("Good day2")

    }),

    server.get('/api/data', (req, res) =>{

        const authHeader = req.headers;

        console.log("\n ************ /api/data *********** \n ");

        console.log("session ID \n");
        console.log(req.sessionID);

        console.log("\n Cookie")
        console.log(req.cookies)

        console.log({authHeader});
    
        if (!authHeader) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }

        let data = [{date1: "abc"}, {data2: "def"}] 

        res.send(data)

    })
}

module.exports = routes;