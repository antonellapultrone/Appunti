import express from 'express';
import {pool} from "./conection.js"
const app = express();

//middelware
app.use(express.static("public"));

//para reconocer los datos desde paginas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//validacion del registro
app.post("/validarRegister", function (req, res) {
    const datos = req.body;

    let name = datos.firstName;
    let apellido = datos.lastName;
    let email = datos.email;
    let password = datos.password;
    let confirmar = datos.confirmPass;

    //buscamos que no exista el mail
    // Validar contraseñas coincidentes
    if (password !== confirmar) {
        //MOSTRAR ERROR EN FRONT
        return res.status(400).send("Las contraseñas no coinciden.");
    }else{
        let buscar = "SELECT * FROM usuario_cliente WHERE mail = '"+ email +"' ;";
        pool.query(buscar, function (err, row) {
            if (err) {
                throw err;
            }else{
                if(row.length > 0){
                    console.log("No se puede registrar el usuario, ya existe");
                }else{
                    let register = "INSERT INTO usuario_cliente (nombre, apellido, mail, contraseña) VALUES (?, ?, ?, ?)";
                    
                    pool.query(register, [name, apellido, email, password], function (err) {
                        if (err) {
                            console.error("Error: " + err);
                            return res.status(500).send("Error al registrar los datos.");
                        } else {
                            console.log("DATOS ALMACENADOS CORRECTAMENTE");
                            // Redirigir a index.html
                            return res.redirect("/");
                        }
                    });
                }
            }
        });
    }
});

//validacion de login
app.post("/validarLogin", function (req, res) {
    return res.redirect("/");
});

//config de servidor
app.listen(3000, () => {
    console.log(`Servidor ejecutándose en http://localhost:3000`);
});

//api para obtener info de cards
app.get('/api/cards', (req, res) => {
    pool.query('SELECT * FROM servicio', (err, results) => {
        if (err) {
        res.status(500).send('Error en la base de datos');
        } else {
        res.json(results);
        }
    });
});