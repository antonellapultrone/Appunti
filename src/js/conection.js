import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './credenciales.env' });

const bd = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

const conection = {
    conectarDataBase() {
        bd.connect(function(err) {
            if (err) {
                throw err;
            } else {
                console.log("Conexión a la Base de Datos 'Appunti' exitosa");
            }
        });
    },
    cerrarDataBase() {
        bd.end(function(err) {
            if (err) {
                throw err;
            } else {
                console.log("Conexión a la Base de Datos 'Appunti' cerrada");
            }
        });
    },
    queryDataBase(query, callback) {
        bd.query(query, function(err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    consulta(query) {
        this.conectarDataBase();
        this.queryDataBase(query, (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
            } else {
                console.log(results);
            }
        });
        this.cerrarDataBase();
    },
    insertUser() {
        // Alta de usuario
    }
};

export default conection;
