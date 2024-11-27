import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import conection from './conection.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
app.use(express.static(path.join(__dirname, '../../')));

app.get('/api/cards', (req, res) => {
    conection.queryDataBase('SELECT * FROM servicio', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
        } else {
            res.json(results);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/home.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});