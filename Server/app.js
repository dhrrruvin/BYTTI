const express = require("express");
const cors = require("cors");
const parser = require("cookie-parser");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(parser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

require("./config/database");
require("./models/user");

app.use("/auth", require("./authentication/routes/auth"));

app.use("/", require("./routes/index"));
app.use("/", require("./routes/book_ticket"));

app.get("/", (req, res) => {
  res.send("Helo");
});

app.listen(6969);
