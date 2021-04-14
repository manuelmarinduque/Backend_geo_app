const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyecto_saas",
});

mysqlConnection.connect((error) => {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log("La base de datos está conectada.");
    return;
  }
});

module.exports = mysqlConnection;
