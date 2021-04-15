const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_empresa', (req, res) => {
    mysqlConnection.query('INSERT INTO empresa SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Empresa creada satisfactoriamente." })
    })
})

router.get('/obtener_empresas', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM empresa WHERE estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.get('/obtener_empresa', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM empresa WHERE id_empresa=${data.row[0].id_empresa} AND estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/actualizar_empresa', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { nombre_empresa, direccion, ciudad, telefono, departamento, id_empresa } = req.body
            mysqlConnection.query('UPDATE empresa SET nombre_empresa=?, direccion=?, ciudad=?, telefono=?, departamento=? WHERE id_empresa=? AND estado=1',
                [nombre_empresa, direccion, ciudad, telefono, departamento, id_empresa],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Empresa actualizada satisfactoriamente." })
                })
        }
    })
})

router.delete('/eliminar_empresa', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { id_empresa } = req.body
            mysqlConnection.query(`UPDATE empresa SET estado=0 WHERE id_empresa=${id_empresa}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Empresa eliminada satisfactoriamente." })
            })
        }
    })
})


module.exports = router