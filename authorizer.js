/////////////////////////////
// authorizer.js
//

module.exports = 
function(req, res, next) {

    if (!req.headers["authorization"]) {
        return res.status(401).send("Access denied. No authorization provided.");
      }
     
    next();
};