const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');
const token_required = require('../functions/token_required_function')


router.post('/crear_curso', (req, res) => {
    mysqlConnection.query('INSERT INTO curso SET ?', req.body, (error) => {
        error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Curso creado satisfactoriamente." })
    })
})

router.get('/obtener_cursos', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM curso WHERE estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.get('/obtener_cursos_sede', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            mysqlConnection.query(`SELECT * FROM curso WHERE id_sede=${data.row[0].id_sede} AND estado=1`, (error, row) => {
                error? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({data: row})
            })
        }
    })
})

router.put('/actualizar_curso', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { nombre_curso, codigo_curso, descripcion, creditos, id_sede, id_curso } = req.body
            mysqlConnection.query('UPDATE curso SET nombre_curso=?, codigo_curso=?, descripcion=?, creditos=?, id_sede=? WHERE id_curso=? AND estado=1',
                [nombre_curso, codigo_curso, descripcion, creditos, id_sede, id_curso],
                (error) => {
                    error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Curso actualizado satisfactoriamente." })
                })
        }
    })
})

router.delete('/eliminar_curso', token_required, (req, res) => {
    jwt.verify(req.token, "3ywg&hsnxu43o9+iaz&sdtr", (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message })
        } else {
            const { id_curso } = req.body
            mysqlConnection.query(`UPDATE curso SET estado=0 WHERE id_curso=${id_curso}`, (error, row) => {
                error ? res.status(500).json({ message: error.sqlMessage }) : res.status(200).json({ message: "Curso eliminado satisfactoriamente." })
            })
        }
    })
})


module.exports = router