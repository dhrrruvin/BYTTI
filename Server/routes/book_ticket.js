const express = require("express");
const router = express.Router();
const { getConnection, releaseConnection } = require("../config/mysqlDB");

// try to book ticket
// check for payment
// save every details of booking in user
// on any error rollback the transactions
// else commit the transactions

router.get("/book", async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    connection.beginTransaction();
  } catch (error) {
    console.log("error getting connection");
    console.error(error);
    return;
  }

  let start_id, end_id;

  const getIdRange = new Promise((resolve, reject) => {
    connection.query(
      `select * from book_seats where train_number="${req.body.train_number}" and (source_station_code="${req.body.source}" or destination_station_code="${req.body.destination}") for update`,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });

  try {
    result = await getIdRange;
    (start_id = result[0].id), (end_id = result[1].id);
    console.log("lock acquired!");
  } catch (error) {
    console.log("error in getting lock");
    console.error(error);
    connection.rollback((rollbackError) => {
      console.log(rollbackError);
    });
  }

  const bookTicket = new Promise((resolve, reject) => {
    connection.query(
      `update book_seats set seats = seats-1 where id between ${start_id} and ${end_id}`,
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });

  try {
    result = await bookTicket;
    console.log("ticket booked");
  } catch (error) {
    console.log("error in reserving seats");
    console.error(error);
    connection.rollback((rollbackError) => {
      console.log(rollbackError);
    });
  }

  try {
    result = connection.commit();
    releaseConnection(connection);
  } catch (error) {
    console.log("error commiting data");
    console.error(error);
    connection.rollback((rollbackError) => {
      console.log(rollbackError);
    });
  }
});

module.exports = router;
