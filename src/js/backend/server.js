import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Importa fileURLToPath
import conection from './conection.js';

const app = express();
const PORT = 3000;

// Obtén la ruta del directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '../../')));

// Ruta para obtener datos de las tarjetas
app.get('/api/cards', (req, res) => {
    conection.queryDataBase('SELECT * FROM servicio', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
        } else {
            res.json(results); // Enviar los datos como JSON al frontend
        }
    });
});

// Si no se ha encontrado una ruta específica, servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/home.html')); // Servir index.html
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});