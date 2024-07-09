const express = require('express');
const router = express.Router();
const mysqlConexion = require('../conexion');

router.get('/clima/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const sql = 'SELECT fecha, temperatura, humedad FROM datos WHERE user_id = ?';
    mysqlConexion.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos del clima:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

router.get('/sueno/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const sql = 'SELECT fecha, horas_sueno FROM datos WHERE user_id = ?';
    mysqlConexion.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos de sueño:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
