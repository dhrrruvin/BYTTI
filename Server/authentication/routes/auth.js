const express = require("express");
const router = express.Router();
const path = require("path");
const authMiddleWare = require("../lib/utils").authMiddleWare;
const register = require("../controller/register");
const login = require("../controller/login");
const logout = require("../controller/logout");
const getData = require("../controller/getData");
const validateUser = require("../controller/validateUser");

router.use(express.static("public"));

router.get("/home", authMiddleWare, (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../public/homepage.html"));
});

router.get("/", authMiddleWare, (req, res, next) => {
  res.send("Hello");
});

// router.get("/login", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "../../public/login.html"));
// });

// router.get("/register", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "../../public/register.html"));
// });

router.get("/getData", getData);

router.get("/logout", logout);

router.post("/login", login);

router.post("/register", register);

router.post("/validate-user", validateUser);

module.exports = router;
