const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  let query = "SELECT * FROM gas_station WHERE is_active=1";
  mysqlConnection.query(query, (error, rows) => {
    error
      ? res.status(500).json({ message: error.message })
      : res.status(200).json({
          token: jwt.sign({ gas_stations: rows }, "3ywg&hsnxu43o9+iaz&sdtr"),
        });
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * from gas_station WHERE id=${id} AND is_active=1 LIMIT 1`;
  mysqlConnection.query(query, (err, results, fields) => {
    if (err) {
      res.status(500).json({ message: err.message });
    }
    if (results.length !== 0) {
      res.status(200).json({
        token: jwt.sign({ data: results }, "3ywg&hsnxu43o9+iaz&sdtr"),
      });
    } else {
      res.status(204).json({
        token: jwt.sign(
          { data: "Station doesn't exist" },
          "3ywg&hsnxu43o9+iaz&sdtr"
        ),
      });
    }
  });
});

router.post("/", (req, res) => {
  data = Object.values(req.body);
  let query =
    "INSERT INTO gas_station (name, address, phone, latitude, longitude) VALUES (?)";
  mysqlConnection.query(query, [data], (err, results, fields) => {
    err
      ? res.status(400).json({ message: err.message })
      : res.status(201).json({ data: "Done" });
  });
});

router.delete("/", (req, res) => {
  let id = req.body.id;
  let query = `UPDATE gas_station SET is_active=0 WHERE id=${id}`;
  mysqlConnection.query(query, (err, results, fields) => {
    console.log(results);
    err
      ? res.status(400).json({ message: err.message })
      : res.status(204).json({ data: "Done" });
  });
});

router.put("/", (req, res) => {
  let id = req.body.id;
  let station = req.body;
  delete station.id;
  let query = `UPDATE gas_station SET ? WHERE id=${id}`;
  mysqlConnection.query(query, [station], (err, results, fields) => {
    console.log(results);
    err
      ? res.status(400).json({ message: err.message })
      : res.status(200).json({ data: "Done" });
  });
});

module.exports = router;
