const controller = require("./stations.controller");
const store = require("../../db/station.mysql");

module.exports = controller(store);
