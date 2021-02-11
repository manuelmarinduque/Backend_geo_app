const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/create_user', (req, res) => {
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    mysqlConnection.query('INSERT INTO usuario SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "User created successfully." })
    })
})

router.get('/get_users', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario WHERE is_active=1', (error, row) => {
        error ? res.status(500).json({ message: error.message }) : res.status(200).json({ data: row })
    })
})

router.get('/get_user', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM usuario WHERE doc_number = ${data.row[0].doc_number} AND is_active=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/update_user', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { doc_number, doc_type, full_name, genre, nacionality, address, phone } = req.body
            mysqlConnection.query('UPDATE usuario SET full_name=?, genre=?, nacionality=?, address=?, phone=? WHERE doc_number=? AND is_active=1',
                [full_name, genre, nacionality, address, phone, data.row[0].doc_number],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "User updated successfully." })
                })
        }
    })
})

router.post('/change_password', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM usuario WHERE doc_number=${data.row[0].doc_number} AND is_active=1`, (error, row) => {
                if (error) {
                    res.status(500).json({ message: error.sqlMessage })
                } else {
                    if (compareSync(req.body.new_password, row[0].password)) {
                        res.status(400).json({ message: 'La nueva contraseña es igual a la anterior' })
                    } else {
                        const salt = genSaltSync(10);
                        new_password = hashSync(req.body.new_password, salt);
                        mysqlConnection.query('UPDATE usuario SET password=? WHERE doc_number=?', [new_password, data.row[0].doc_number],
                            (error, row) => {
                                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Your password was updated successfully", data: row })
                            })
                    }
                }
            })
        }
    })
})

router.delete('/delete_user', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`UPDATE usuario SET is_active=0 WHERE doc_number = ${data.row[0].doc_number}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Your account was deleted successfully." })
            })
        }
    })
})

router.post('/login', (req, res) => {
    mysqlConnection.query(`SELECT * FROM usuario WHERE doc_number = ${req.body.doc_number} AND is_active=1`, (error, row) => {
        if (error) {
            res.status(400).json({ message: error.sqlMessage })
        } else {
            if (row.length >= 1) {
                compareSync(req.body.password, row[0].password) ? res.status(200).json({ token: jwt.sign({ row }, "3ywg&hsnxu43o9+iaz&sdtr", { expiresIn: "1h" }) }) : res.status(400).json({ message: 'La contraseña es incorrecta' })
            } else {
                res.json({ message: 'El usuario no está registrado' })
            }
        }
    })
})


module.exports = router