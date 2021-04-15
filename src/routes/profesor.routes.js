const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_profesor', (req, res) => {
    mysqlConnection.query('INSERT INTO profesor SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Profesor creado satisfactoriamente." })
    })
})

router.get('/obtener_profesores', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM profesor WHERE estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.get('/obtener_profesores_sede', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM profesor WHERE id_sede=${data.row[0].id_sede} AND estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/actualizar_profesor', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { nombre_profesor, numero_documento, direccion_residencia, numero_celular, genero, nacionalidad, fecha_ingreso, tipo_contrato, especialidad, id_sede, id_profesor } = req.body
            mysqlConnection.query('UPDATE profesor SET nombre_profesor=?, numero_documento=?, direccion_residencia=?, numero_celular=?, genero=?, nacionalidad=?, fecha_ingreso=?, tipo_contrato=?, especialidad=?, id_sede=? WHERE id_profesor=? AND estado=1',
                [nombre_profesor, numero_documento, direccion_residencia, numero_celular, genero, nacionalidad, fecha_ingreso, tipo_contrato, especialidad, id_sede, id_profesor],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Profesor actualizado satisfactoriamente." })
                })
        }
    })
})

router.delete('/eliminar_profesor', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { id_profesor } = req.body
            mysqlConnection.query(`UPDATE profesor SET estado=0 WHERE id_profesor=${id_profesor}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Profesor eliminado satisfactoriamente." })
            })
        }
    })
})


module.exports = router