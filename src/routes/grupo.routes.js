const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_grupo', (req, res) => {
    mysqlConnection.query('INSERT INTO grupo SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Grupo creado satisfactoriamente." })
    })
})

router.get('/obtener_grupos', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM grupo WHERE estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.get('/obtener_grupos_sede', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM grupo WHERE id_sede=${data.row[0].id_sede} AND estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/actualizar_grupo', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { codigo_grupo, semestre, cupo_estudiantes, total_estudiantes, id_sede, id_grupo } = req.body
            mysqlConnection.query('UPDATE grupo SET codigo_grupo=?, semestre=?, cupo_estudiantes=?, total_estudiantes=?, id_sede=? WHERE id_grupo=? AND estado=1',
                [codigo_grupo, semestre, cupo_estudiantes, total_estudiantes, id_sede, id_grupo],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Grupo actualizado satisfactoriamente." })
                })
        }
    })
})

router.delete('/eliminar_grupo', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { id_grupo } = req.body
            mysqlConnection.query(`UPDATE grupo SET estado=0 WHERE id_grupo=${id_grupo}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Grupo eliminado satisfactoriamente." })
            })
        }
    })
})


module.exports = router