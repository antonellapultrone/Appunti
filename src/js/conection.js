let mysql = require('mysql2');

let conection = mysql.createConnection({
    host: 'localhost',
    database: 'appunti',
    user: 'root',
    password: 'QUETEIMPORTA1505'
});

conection.connect(function(err){
    if (err) {
        throw err;
    }else{
        console.log("conexion exitosa");
    }
})

conection.end();