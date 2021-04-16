const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_sede', (req, res) => {
    mysqlConnection.query('INSERT INTO sede SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Sede creada satisfactoriamente." })
    })
})

router.get('/obtener_sedes', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM sede WHERE estado=1`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ data: row })
            })
        }
    })
})

router.get('/obtener_sedes_empresa', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM sede WHERE id_empresa=${data.row[0].id_empresa} AND estado=1`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ data: row })
            })
        }
    })
})

router.get('/obtener_sede', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM sede WHERE id_sede=${data.row[0].id_sede} AND estado=1`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ data: row })
            })
        }
    })
})

router.put('/actualizar_sede', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { nombre_sede, id_empresa, direccion, latitud, longitud, telefono, ciudad, id_sede } = req.body
            mysqlConnection.query('UPDATE sede SET nombre_sede=?, id_empresa=?, direccion=?, latitud=?, longitud=?, telefono=?, ciudad=? WHERE id_sede=? AND estado=1',
                [nombre_sede, id_empresa, direccion, latitud, longitud, telefono, ciudad, id_sede],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Sede actualizada satisfactoriamente." })
                })
        }
    })
})

router.delete('/eliminar_sede', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { id_sede } = req.body
            mysqlConnection.query(`UPDATE sede SET estado=0 WHERE id_sede=${id_sede}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Sede eliminada satisfactoriamente." })
            })
        }
    })
})


module.exports = router