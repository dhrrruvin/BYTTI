const { connection } = require("mongoose");
const mysql = require("mysql2");

require("dotenv").config();

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DB_STRING,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("connected to mysql!");
// });

const poolConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_STRING,
};

const MAX_POOL_SIZE = 10;

let connectionPool = [];

function createConnectionPool() {
  for (i = 0; i < MAX_POOL_SIZE; i++) {
    const connection = mysql.createConnection(poolConfig);
    connectionPool.push(connection);
  }
}

function getConnection() {
  return new Promise((resolve, reject) => {
    if (connectionPool.length === 0) {
      const connection = mysql.createConnection(poolConfig);
      console.log("mysql connected");
      resolve(connection);
    } else {
      const connection = connectionPool.pop();
      console.log("mysql connected!");
      resolve(connection);
    }
  });
}

function releaseConnection(connection) {
  connectionPool.push(connection);
}

createConnectionPool();

module.exports = {
  getConnection,
  releaseConnection,
};
