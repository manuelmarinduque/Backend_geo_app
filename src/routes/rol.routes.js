const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_rol', (req, res) => {
    mysqlConnection.query('INSERT INTO rol SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Rol creado satisfactoriamente." })
    })
})

router.get('/obtener_roles', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM rol WHERE estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/actualizar_rol', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { nombre_rol, id_rol } = req.body
            mysqlConnection.query('UPDATE rol SET nombre_rol=? WHERE id_rol=? AND estado=1', [nombre_rol, id_rol],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Rol actualizado satisfactoriamente." })
                })
        }
    })
})

router.delete('/eliminar_rol', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { id_rol } = req.body
            mysqlConnection.query(`UPDATE rol SET estado=0 WHERE id_rol=${id_rol}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Rol eliminado satisfactoriamente." })
            })
        }
    })
})


module.exports = router