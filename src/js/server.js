import express from 'express';
import cors from 'cors';
import {pool} from "./conection.js"
import {validarRegister, validarLogin} from "./validate.js"
const app = express();

//middelware
app.use(express.static("public"));

//para reconocer los datos desde paginas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//validacion del registro
app.post("/validarRegister", validarRegister);

//validacion de login
app.post("/validarLogin", validarLogin);

//config de servidor
app.listen(3000, () => {
    console.log(`Servidor ejecutándose en http://localhost:3000`);
});

app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST'], // Define métodos permitidos
}));

//api para obtener info de cards
app.get('/api/cards', async (req, res) => {
    try {
        // Usa async/await para manejar la consulta
        const [results] = await pool.query('SELECT * FROM servicio');
        res.json(results); // Responde con los resultados en formato JSON
    } catch (err) {
        console.error("Error en la consulta de cards:", err);
        res.status(500).send('Error en la base de datos');
    }
});
