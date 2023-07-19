const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const pub_path = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pub_path, "utf8");

const validateUser = async (req, res) => {
  let tokenParts;
  try {
    tokenParts = req.cookies.jwt.split(" ");
  } catch (e) {
    return;
  }

  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    console.log("Got the authorization header");
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: ["RS256"],
      });
      console.log(verification);
      console.log("user verified");
      const data = { name: verification.name, email: verification.email };
      return res.send(data);
    } catch (error) {
      res.status(401).json({ success: false, msg: "You are not authorized!" });
    }
  }
};
module.exports = validateUser;
