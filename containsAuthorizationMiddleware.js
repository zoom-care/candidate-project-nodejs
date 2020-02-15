const containsAuthorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);

  if (!authHeader || typeof authHeader !== "string") {
    return res.status(403).json({
      status: 403,
      message: "Forbidden!"
    });
  }

  next();
};

module.exports = containsAuthorization;
