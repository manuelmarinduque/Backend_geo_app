const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_usuario', (req, res) => {
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    mysqlConnection.query('INSERT INTO usuario SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Usuario creado satisfactoriamente." })
    })
})

router.get('/obtener_usuarios', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario WHERE estado=1', (error, row) => {
        error ? res.status(500).json({ message: error.message }) : res.status(200).json({ data: row })
    })
})

router.get('/obtener_usuario', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM usuario WHERE numero_documento = ${data.row[0].numero_documento} AND estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/actualizar_usuario', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { nombre_usuario, genero, nacionalidad, direccion, numero_celular } = req.body
            mysqlConnection.query('UPDATE usuario SET nombre_usuario=?, genero=?, nacionalidad=?, direccion=?, numero_celular=? WHERE numero_documento=? AND estado=1',
                [nombre_usuario, genero, nacionalidad, direccion, numero_celular, data.row[0].numero_documento],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Usuario actualizado satisfactoriamente." })
                })
        }
    })
})

router.put('/cambiar_password', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM usuario WHERE numero_documento=${data.row[0].numero_documento} AND estado=1`, (error, row) => {
                if (error) {
                    res.status(500).json({ message: error.sqlMessage })
                } else {
                    if (compareSync(req.body.new_password, row[0].password)) {
                        res.status(400).json({ message: 'La nueva contraseña es igual a la anterior' })
                    } else {
                        const salt = genSaltSync(10);
                        new_password = hashSync(req.body.new_password, salt);
                        mysqlConnection.query('UPDATE usuario SET password=? WHERE numero_documento=?', [new_password, data.row[0].numero_documento],
                            (error, row) => {
                                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "La contraseña se actualizó satisfactoriamente", data: row })
                            })
                    }
                }
            })
        }
    })
})

router.delete('/eliminar_usuario', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`UPDATE usuario SET estado=0 WHERE numero_documento = ${data.row[0].numero_documento}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Your account was deleted successfully." })
            })
        }
    })
})

router.post('/login', (req, res) => {
    mysqlConnection.query(`SELECT * FROM usuario WHERE numero_documento = ${req.body.numero_documento} AND estado=1`, (error, row) => {
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