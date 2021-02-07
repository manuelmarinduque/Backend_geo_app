const station = require("../components/stations/gas_station.routes");

const routes = (server) => {
  server.use("/station", station);
};

module.exports = routes;
