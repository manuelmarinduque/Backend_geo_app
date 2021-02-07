const mysqlConnection = require("./database");

const findAll = (table) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT * FROM ${table} WHERE isActive=1`,
      (error, rows) => {
        if (!error) {
          return resolve(rows);
        }
        return reject(error);
      }
    );
  });
};

const addOne = (table, station) => {
  return new Promise((resolve, reject) => {
    let newStation = {
      name: station.name,
      address: station.address,
      phone: station.phone,
      latitude: station.latitude,
      longitude: station.longitude,
      isActive: 1,
    };
    let query = `INSERT INTO ${table} (name, address, phone, latitude, longitude, isActive) VALUES (?)`;
    mysqlConnection.query(
      query,
      [Object.values(newStation)],
      (err, results, fields) => {
        console.log(results);
        if (!err) {
          return resolve(results);
        }
        return reject(err.message);
      }
    );
  });
};

module.exports = {
  findAll,
  addOne,
};
