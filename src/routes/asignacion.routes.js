const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_asignacion', (req, res) => {
    mysqlConnection.query('INSERT INTO asignacion SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Asignacion creado satisfactoriamente." })
    })
})

router.get('/obtener_asignaciones', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM asignacion WHERE estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.get('/obtener_asignaciones_sede', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM asignacion WHERE id_sede=${data.row[0].id_sede} AND estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/actualizar_asignacion', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { horario, id_profesor, id_curso, id_grupo, id_sede, id_asignacion } = req.body
            mysqlConnection.query('UPDATE asignacion SET horario=?, id_profesor=?, id_curso=?, id_grupo=?, id_sede=? WHERE id_asignacion=? AND estado=1',
                [horario, id_profesor, id_curso, id_grupo, id_sede, id_asignacion],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Asignacion actualizado satisfactoriamente." })
                })
        }
    })
})

router.delete('/eliminar_asignacion', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { id_asignacion } = req.body
            mysqlConnection.query(`UPDATE asignacion SET estado=0 WHERE id_asignacion=${id_asignacion}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Asignacion eliminado satisfactoriamente." })
            })
        }
    })
})


module.exports = router