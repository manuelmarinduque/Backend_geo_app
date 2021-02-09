const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post('/create_user', (req, res) => {
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    mysqlConnection.query('INSERT INTO user SET ?', req.body, (error, row) => {
        error ? res.status(500).json({message: error.message}) : res.status(200).json({data: row})
    })
})

router.get('/get_users', (req, res) => {
    mysqlConnection.query('SELECT * FROM user WHERE is_active=1', (error, row) => {
        error ? res.status(500).json({message: error.message}) : res.status(200).json({data: row})
    })
})

router.get('/get_user/:doc_number', (req, res) => {
    mysqlConnection.query(`SELECT * FROM user WHERE doc_number=${req.params.doc_number} AND is_active=1`,  (error, row) => {
        error ? res.status(500).json({message: error.message}) : res.status(200).json({data: row})
    })
})

router.put('/update_user/:doc_number', (req, res) => {
    const { doc_number, doc_type, full_name, genre, nacionality, address, phone } = req.body
    mysqlConnection.query('UPDATE user SET doc_number=?, doc_type=?, full_name=?, genre=?, nacionality=?, address=?, phone=? WHERE doc_number=? AND is_active=1',
    [doc_number, doc_type, full_name, genre, nacionality, address, phone, req.params.doc_number],
    (error, row) => {
        error ? res.status(500).json({message: error.message}) : res.status(200).json({data: row})
    })
})

router.post('/change_password/:doc_number', (req, res) => {
    mysqlConnection.query(`SELECT * FROM user WHERE doc_number=${req.params.doc_number} AND is_active=1`, (error, row) => {
        if (error) {
            res.status(500).json({message: error.message})      
        } else {
            if (compareSync(req.body.new_password, row[0].password)) {
                res.status(400).json({message: 'La nueva contraseña es igual a la anterior'})
            } else {
                const salt = genSaltSync(10);
                new_password = hashSync(req.body.new_password, salt);
                mysqlConnection.query('UPDATE user SET password=? WHERE doc_number=?', [new_password, req.params.doc_number],
                (error, row) => {
                    error ? res.status(500).json({message: error.message}) : res.status(200).json({data: row})
                })
            }
        }
    })
})

router.delete('/delete_user/:doc_number', (req, res) => {
    mysqlConnection.query(`UPDATE user SET is_active=0 WHERE doc_number = ${req.params.doc_number}`, (error, row) => {
        error ? res.status(500).json({message: error.message}) : res.status(200).json({data: row})
    })
})

module.exports = router