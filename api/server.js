const express = require("express");
const bodyParser = require("body-parser");
const mysqlPool = require('./conexion');
const cors = require('cors');

const usuarios = require("./routes/usuarios");
const datos = require("./routes/datos");
const login = require("./routes/login");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/routes/usuarios/register", (req, res) => {
    const { name, email, phone, password, birthDate } = req.body;

    const sql = 'INSERT INTO usuarios (nombre, email, telefono, contrasena, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)';
    mysqlPool.query(sql, [name, email, phone, password, birthDate], (err, result) => {
        if (err) {
            console.error('Error al registrar:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).send('Registro exitoso');
    });
});

app.post("/api/routes/login/login", (req, res) => { // Cambio a POST
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

// Usar las rutas definidas en usuarios.js, login.js y datos.js
app.use("/api/routes/usuarios", usuarios);
app.use("/api/routes/login", login);
app.use("/api/datos", datos);

app.listen(3001, () => {
    console.log("Servidor API en ejecución en http://localhost:3001");
});
