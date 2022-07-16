const jwt = require("jsonwebtoken");
const secret = process.env.secret;

const auth = async (req, res, next) => {
  try {
    let decodeData;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      decodeData = jwt.verify(token, secret);
      req.userId = decodeData?.id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
