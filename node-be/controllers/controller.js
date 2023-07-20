const isAuth            = require("../middleware/isAuth")
const sameOrigin        = require("../middleware/sameOrigin");


const controller = (server) =>{

    server.post('/addUser', 
        sameOrigin, 
        isAuth, 
        (req, res) =>{

        console.log("\n ************ /addUser *********** \n");
        console.log("user:", req.body)

        res.sendStatus(200);
    }),

    server.get('/greeting', 
        isAuth,
        (req, res) =>{

        console.log("\n ************ /greeting *********** \n");

        console.log("\n req ")
        console.log(req)

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

module.exports = controller;