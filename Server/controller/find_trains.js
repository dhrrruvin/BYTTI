const Station = require("../models/station");
const TrainRoute = require("../models/trainRoute");
const Train1 = require("../models/train");

const handleResult = (result) => {
  let trainsBetweenStation = [];
  for (i = 0; i < result.length - 1; i += 2) {
    trainsBetweenStation.push([result[i], result[i + 1]]);
  }

  console.log("final result: ", trainsBetweenStation.length);
  // res.status(200).send(trainsBetweenStation.length.toString());
  return trainsBetweenStation;
};

// const sendData = (result, res) => {
//   const batchSize = 5;

//   const readble = new require("stream").Readable({ objectMode: true });

//   const batches = [];
//   for (let i = 0; i < result.length; i += batchSize) {
//     const batch = result.slice(i, i + batchSize);
//     batches.push(batch);
//   }

//   readble.push(null);

//   res.setHeader("Content-Type", "application/json");
//   res.setHeader("Transfer-Encoding", "chunked");

//   readble.pipe(res);
// };

const find_trains = async (req, res) => {
  const source = req.query.src;
  const destination = req.query.dest;

  console.log(source);
  console.log(destination);

  q = {
    $and: [
      { stations: source },
      { stations: destination },
      {
        $expr: {
          $lt: [
            { $indexOfArray: ["$stations", source] },
            { $indexOfArray: ["$stations", destination] },
          ],
        },
      },
    ],
  };

  projection = { _id: 0, train_number: 1 };

  // returns the list of train numbers from A->B
  TrainRoute.find(q, projection)
    .exec()
    .then((resp) => extractAndSearch(resp));

  const extractAndSearch = (object) => {
    let available_trains = [];
    let result = [];
    // console.log(object);
    // extract the trains from the json object
    object.filter((obj) => available_trains.push(obj.train_number));

    // console.log(available_trains);

    // get the FROM station id
    let from_id;
    Station.findOne({ station_code: source })
      .then((station) => {
        from_id = station.id;
      })
      .catch((e) => console.log(e));

    // get the TO station id
    Station.findOne({ station_code: destination })
      .then((station) => {
        // when you have both {from} and {to} station id
        // find all the trains with {available_trains} which also have station field as {from} or {to}
        // this will give all the details of the trains on searched stations

        to_id = station.id;
        q = {
          $and: [
            { train_number: { $in: available_trains } },
            { $or: [{ "route.station": from_id }, { "route.station": to_id }] },
          ],
        };
        p = {
          train_number: 1,
          train_name: 1,
          "route.station": 1,
          "route.arrival_time": 1,
          "route.departure_time": 1,
        };
        Train1.find(q, p)
          .exec()
          .then((route) => {
            result.push(route);
            console.log("total results: ", result[0].length);

            // this method will make pair of {source} and {destination} train details to send this results to front-end
            let trainsBetweenStations = handleResult(result[0]);

            res.status(200).send(trainsBetweenStations);

            // sendData(trainsBetweenStations, res);
          });
      })
      .catch((e) => console.log(e));
  };
};

module.exports = find_trains;
