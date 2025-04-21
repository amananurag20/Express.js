const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token = req.headers?.authorization?.split(" ")[1];
  const token = req.cookies?.token;

  try {
    let userData = jwt.verify(token, "helloworld");
    req.user = userData;
    next();
  } catch (e) {
    return res.json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
