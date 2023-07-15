const mysql2 = require('mysql2');
//const mysql2 = require('mysql2/promise');
const crypto = require('crypto');

const userPool = mysql2.createPool({
    host: 'localhost',
    user: 'testUser',
    password: 'testPW',
    database: 'user'
})

// Insert test user in DB
let userName = "testUser"
let password = "testPW"

const findUser = (userName) => {
    
    //console.log("usfindUser", userName)

    let userExist = false;

    return new Promise((response, rej) => {

        userPool.execute(
        `SELECT * FROM users
        WHERE userName = ?`, 
        [userName], 
        (err, res) => 
        {
            if(err){
                //console.log({err})
                new Error(err)
            } 
            if(res) {
                //console.log(res.length)

                if(res.length == 1) userExist = true
                
                response(userExist)
            }
        })    
    })
}

findUser(userName)
.then(userExist => {
    //console.log("userExist ", userExist)
    if(!userExist){

        let salt            = crypto.randomBytes(16);
        let hashedPassword  = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256')
        let jwtAccess

        userPool.execute(`INSERT INTO users (userName, hashedPassword, salt) VALUES (?, ?, ?)`,
        [userName, hashedPassword, salt],
        (err, res) => {
            console.log("resss ", res)
            console.log("errr ", err)
        })
    }
})
// END Insert test user in DB

module.exports = userPool;
