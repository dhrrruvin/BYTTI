const express = require("express");
const router = express.Router();
const Fuse = require("fuse.js");
const path = require("path");
const find_trains = require("../controller/find_trains");

router.use(express.static("public"));

const list = require("../utils/stations.json");
const options = {
  keys: ["station_code", "station_name"],
  threshold: 0.2,
};

router.get("/stations", (req, res) => {
  const fuse = new Fuse(list, options);
  const suggestions = fuse.search(req.query.station);
  if (suggestions.length >= 10) {
    res.send(suggestions.slice(0, 10));
  } else {
    res.send(suggestions);
  }
});

router.post("/find_trains", async (req, res) => {
  // const source = req.query.source;
  // const destination = req.query.destination;
  // res.sendFile(path.join(__dirname, "../public", "train_results.html"));
});

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "homepage.html"));
});

module.exports = router;
