const jwt = require("jsonwebtoken");
require('dotenv').config();



function jwtGenerator(user_id){
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 10 * 60} )  //expiresIN (koliko minuta 1min(1 * 60))

}
module.exports = jwtGenerator;