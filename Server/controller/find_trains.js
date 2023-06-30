const path = require("path");

const find_trains = (req, res) => {
  // const source = req.body.source;
  // const destination = req.body.destination;

  const source = req.query.src;
  const destination = req.query.dest;

  // console.log(source);

  res.sendFile(path.join(__dirname, "../public", "train_results.html"));
};

module.exports = find_trains;
