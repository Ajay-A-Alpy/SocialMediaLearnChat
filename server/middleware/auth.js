const jwt = require("jsonwebtoken");
const secret = process.env.secret;

const auth = async (req, res, next) => {
  try {
    console.log("hello1111111111111111");
    let decodeData;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      decodeData = jwt.verify(token, secret);
      req.userId = decodeData?.id;
      console.log("hello14444444444444444444");
      console.log(req.userId);
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
