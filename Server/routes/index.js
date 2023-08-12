const router = require("express").Router();
// const router = express.Router();
const Fuse = require("fuse.js");
const path = require("path");
const find_trains = require("../controller/find_trains");
const get_seat_count = require("../controller/seat_count");

// router.use(express.static("public"));

const list = require("../utils/stations.json");
const options = {
  keys: ["station_name", "station_code"],
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

router.get("/find_trains", find_trains);

router.get("/seats", get_seat_count);

module.exports = router;
