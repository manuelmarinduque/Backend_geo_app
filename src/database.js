const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "lstiven",
  password: "Stiven.root3",
  database: "gas_station",
});

mysqlConnection.connect((error) => {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log("Database is connected.");
    return;
  }
});

module.exports = mysqlConnection;
