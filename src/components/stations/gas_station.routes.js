const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require(".");
// const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, "Query OK", 200);
    })
    .catch((error) => {
      response.error(req, res, error, error.message, 500);
    });
});

router.post("/", (req, res) => {
  controller
    .add(req.body)
    .then((data) => {
      response.success(req, res, data, "Station added", 200);
    })
    .catch((error) => {
      response.error(req, res, error, error.message, 400);
    });
});

module.exports = router;
