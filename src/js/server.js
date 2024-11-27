import express from 'express';
import {pool} from "./conection.js"
const app = express();

//middelware
app.use(express.static("public"));

//para reconocer los datos desde paginas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//validacion del registro
app.post("/validar", function(req, res){
    const datos = req.body;

    let name = datos.firstName;
    let apellido = datos.lastName;
    let email = datos.email;
    let password = datos.password;
    let confirmar = datos.confirmPass;

    let id = pool.query("select ID from usuario_cliente ORDER BY id DESC LIMIT 1;")
    if(id != ''){
        id = 1;
    }

    let register = "INSERT INTO usuario_cliente (nombre, apellido, mail, contraseña) VALUES ('"+ name +"', '"+ apellido +"', '"+ email +"', '"+ password +"');"
    
    pool.query(register, function(err){
        if (err) {
            console.log("Error: " + err);
        }else{
            console.log("DATOS ALMACENADOS CORRECTAMENTE");
        }
    });
});

//config de servidor
app.listen(3000, () => {
    console.log(`Servidor ejecutándose en http://localhost:3000`);
});

//api para obtener info de cards
/* app.get('/api/cards', (req, res) => {
    conection.queryDataBase('SELECT * FROM servicio', (err, results) => {
        if (err) {
        res.status(500).send('Error en la base de datos');
        } else {
        res.json(results);
        }
    });
}); */