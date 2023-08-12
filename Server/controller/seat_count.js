const { getConnection, releaseConnection } = require("../config/mysqlDB");

const get_seat_count = async (req, res) => {
  const source = req.query.src;
  const destination = req.query.dest;
  const train_number = req.query.train_number;

  if (!source || !destination || !train_number) {
    console.log("error getting the query params");
    console.log("train_number: " + train_number);
    console.log("source: " + source);
    console.log("destination: " + destination);
  }

  let connection;

  try {
    connection = await getConnection();
    connection.beginTransaction();
  } catch (err) {
    console.log("error getting connection");
    console.error(err);
  }

  let response, start_id, end_id;

  const get_rows = new Promise((resolve, reject) => {
    connection.query(
      `select id from seats where train_number="${train_number}" and (source_station_code="${source}" or destination_station_code="${destination}")`,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });

  try {
    response = await get_rows;
    if (response.length == 1) {
      start_id = end_id = response[0].id;
    } else {
      start_id = response[0].id;
      end_id = response[1].id;
    }
  } catch (error) {
    console.log("error in get_rows in seats_count.js");
    console.log(error);
  }

  const get_count = new Promise((resolve, reject) => {
    connection.query(
      `select seats from seats where id between ${start_id} and ${end_id}`,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });

  try {
    response = await get_count;
    let min_seat_count = Number.MAX_VALUE;
    for (i = 0; i < response.length; i++) {
      min_seat_count = Math.min(min_seat_count, response[i].seats);
    }

    try {
      connection.commit();
      releaseConnection(connection);
      // console.log("connecxn released!");
    } catch (error) {
      console.log("error commiting data");
      console.error(error);
      releaseConnection(connection);
    }

    res.status(200).send(min_seat_count.toString());
  } catch (err) {
    console.log("error fetching the seats count!");
    console.error(err);
  }
};

module.exports = get_seat_count;
