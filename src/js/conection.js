require('dotenv').config();
let mysql = require('mysql2');

const bd = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Definimos el objeto conection con los métodos conectarDataBase y cerrarDataBase
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

    //REVISAR
    consulta(query, callback) {
        bd.query(query, function(err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    insertUser(){
        //alta de usuario
    }
};

// Exportamos conection como exportación por defecto
module.exports = conection;