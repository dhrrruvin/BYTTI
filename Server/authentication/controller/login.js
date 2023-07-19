const mongoose = require("mongoose");
const User = mongoose.model("User");
const utils = require("../lib/utils");

const login = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.error("error checking existing user!");
    console.log(err);
    return res.status(500).send("internal server error!");
  }

  if (!user) {
    return res.status(404).send("could not find user!");
  }

  let isValidPassword = false;
  try {
    isValidPassword = utils.validPassword(
      req.body.password,
      user.salt,
      user.hash
    );
  } catch (error) {
    console.error("Error comparing hashed password");
    console.log(error);
    return res.status(500).send("internal server error!");
  }

  if (!isValidPassword) {
    return res.status(401).send("invalid credentials");
  }
  console.log("user found and validated");
  const tokenObj = utils.issueJwt(user);

  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", tokenObj.token, cookieOptions);

  console.log("sending...");
  return res.status(200).send({
    success: true,
    email: user.email,
    name: user.username,
  });
};

module.exports = login;
