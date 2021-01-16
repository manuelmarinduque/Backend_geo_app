const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');

router.get('/get_data', (req, res) => {
    mysqlConnection.query('SELECT * FROM gas_station', (error, rows) => {
        if (!error) {
            const token = jwt.sign({gas_stations: rows}, '3ywg&hsnxu43o9+iaz&sdtr')
            res.json({
                token
            });
        } else {
            res.json({
                error
            });
        }
    });
});

module.exports = router;