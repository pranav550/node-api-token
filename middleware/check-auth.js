const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("key1");
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JSONWEBTOKEN);

    console.log("key2", decoded);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
};
