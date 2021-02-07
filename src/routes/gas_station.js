const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM gas_station', (error, rows) => {
        error ? res.status(500).json({message: error.message}) : res.status(200).json({token: jwt.sign({gas_stations: rows}, '3ywg&hsnxu43o9+iaz&sdtr')})
    });
});

module.exports = router;