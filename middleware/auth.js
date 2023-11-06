const jwt = require('jsonwebtoken')

const authentication= async function(req, res, next){
    
    try{
        
        let token = req.cookies.jwt;
        let decodedToken = jwt.verify(token, "ompharate11");
        next()
             
        
    } catch (error) {
        res.redirect("/")
    }
}

module.exports = {authentication}           