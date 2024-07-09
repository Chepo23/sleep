const express = require('express');
const router = express.Router();
const mysqlPool = require('../conexion');

router.post('/register', (req, res) => {
    const { name, email, phone, password, age } = req.body;

    const dateOfBirth = new Date();
    dateOfBirth.setFullYear(dateOfBirth.getFullYear() - age);

    const sql = 'INSERT INTO usuarios (nombre, email, telefono, contrasena, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)';
    mysqlConexion.query(sql, [name, email, phone, password, dateOfBirth], (err, result) => {
        if (err) {
            console.error('Error al registrar:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Registro exitoso');
    });
});

router.get('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son obligatorios' });
    }
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';

    mysqlPool.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error durante el login:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'Inicio de sesión exitoso', user: results[0] });
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    });
});


module.exports = router;
