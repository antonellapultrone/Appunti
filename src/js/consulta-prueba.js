const conection = require('./conection.js');

//cargar datos en bd
const consulta = async () => {
    conection.conectarDataBase();

    conection.consulta("",(err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
        } else {
            console.log('Resultados de la consulta:', results);
        }
    });
    
    conection.cerrarDataBase();
};

consulta();
