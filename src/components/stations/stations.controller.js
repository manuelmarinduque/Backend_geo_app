const TABLE = "station";

module.exports = (storeSQL) => {
  let store = storeSQL;
  if (!storeSQL) {
    store = require("../../db/station.mysql");
  }

  const list = () => {
    return store.findAll(TABLE);
  };

  const add = (station) => {
    return store.addOne(TABLE, station);
  };

  return {
    list,
    add,
  };
};
