import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './credenciales.env' });

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = {
    queryDataBase(query, callback) {
        pool.query(query, function(err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    
    consulta(query) {
        this.queryDataBase(query, (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
            } else {
                console.log(results);
            }
        });
    },

};
