require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',      // Dirección de tu servidor de base de datos
    user: 'root',           // Tu usuario de base de datos
    password: 'password',   // Tu contraseña de base de datos
    database: 'nombre_bd'   // Nombre de la base de datos
});

const db = pool.promise();

module.exports = db;