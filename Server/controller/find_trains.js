const Station = require("../models/station");
const TrainRoute = require("../models/trainRoute");
const Train1 = require("../models/train");

const handleResult = (result) => {
  let trainsBetweenStation = [];
  for (i = 0; i < result.length - 1; i += 2) {
    trainsBetweenStation.push([result[i], result[i + 1]]);
  }

  return trainsBetweenStation;
};

// const find_trains = async (req, res) => {
//   const source = req.query.src;
//   const destination = req.query.dest;

//   console.log(source);
//   console.log(destination);

//   q = {
//     $and: [
//       { stations: source },
//       { stations: destination },
//       {
//         $expr: {
//           $lt: [
//             { $indexOfArray: ["$stations", source] },
//             { $indexOfArray: ["$stations", destination] },
//           ],
//         },
//       },
//     ],
//   };

//   projection = { _id: 0, train_number: 1 };

//   // returns the list of train numbers from A->B
//   TrainRoute.find(q, projection)
//     .exec()
//     .then((resp) => extractAndSearch(resp));

//   const extractAndSearch = (object) => {
//     let available_trains = [];
//     let result = [];

//     // extract the trains from the json object
//     object.filter((obj) => available_trains.push(obj.train_number));

//     // get the FROM station id
//     let from_id, to_id;
//     Station.findOne({ station_code: source })
//       .then((station) => {
//         from_id = station.id;

//         // get the TO station id
//         Station.findOne({ station_code: destination })
//           .then((station) => {
//             // when you have both {from} and {to} station id
//             // find all the trains with {available_trains} which also have station field as {from} or {to}
//             // this will give all the details of the trains on searched stations

//             to_id = station.id;

//             q = {
//               $and: [
//                 { train_number: { $in: available_trains } },
//                 {
//                   $or: [
//                     { "route.station": from_id },
//                     { "route.station": to_id },
//                   ],
//                 },
//               ],
//             };
//             p = {
//               train_number: 1,
//               train_name: 1,
//               "route.station": 1,
//               "route.arrival_time": 1,
//               "route.departure_time": 1,
//             };
//             Train1.find(q)
//               .exec()
//               .then((route) => {
//                 result.push(route);
//                 console.log("total results: ", result[0].length);

//                 // this method will make pair of {source} and {destination} train details to send this results to front-end
//                 let trainsBetweenStations = handleResult(result[0]);

//                 res.status(200).send(trainsBetweenStations);

//                 // sendData(trainsBetweenStations, res);
//               });
//           })
//           .catch((e) => console.log(e));
//       })
//       .catch((e) => console.log(e));
//   };
// };

const find_trains = async (req, res) => {
  const source = req.query.src;
  const destination = req.query.dest;

  console.log(source);
  console.log(destination);

  let q = {
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

  let projection = { _id: 0, train_number: 1 };

  try {
    const resp = await TrainRoute.find(q, projection).exec();
    const available_trains = resp.map((obj) => obj.train_number);

    const from_station = await Station.findOne({ station_code: source });
    const from_id = from_station.id;

    const to_station = await Station.findOne({ station_code: destination });
    const to_id = to_station.id;

    const train_query = {
      $and: [
        { train_number: { $in: available_trains } },
        {
          $or: [{ "route.station": from_id }, { "route.station": to_id }],
        },
      ],
    };

    const projection2 = {
      train_number: 1,
      train_name: 1,
      "route.station": 1,
      "route.arrival_time": 1,
      "route.departure_time": 1,
    };

    const route = await Train1.find(train_query, projection2).exec();

    const trainsBetweenStations = handleResult(route);

    console.log("total results: ", trainsBetweenStations.length);

    res.status(200).json({ success: true, trains: trainsBetweenStations });
  } catch (err) {
    console.log("error finding train!");
    console.log(err);
    res.status(500).json({ success: false, data: "internal server error" });
  }
};

module.exports = find_trains;
