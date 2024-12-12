import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './credenciales.env' });

const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Prueba de conexión
pool.getConnection()
    .then(() => console.log('Base de datos: OK'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

export default pool;