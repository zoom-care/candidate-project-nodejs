module.exports = function(req, res, next) {
  //get the token from the header if present
  //if no token found, return response (without going to the next middelware)
  if (!req.headers["authorization"]) {
    return res.status(401).send("Access denied. No authorization provided.");
  }
  next();
};
