import express from 'express';
import userRoutes from './routes/usuario.routes.js';
import serviceRoutes from './routes/service.routes.js';

const app = express();

// Middleware
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoutes); // Rutas
app.use('/api/service', serviceRoutes);

export default app;

//API PARA LAS CARDS
import pool from './config/conection.js';
//api para obtener info de cards
app.get('/api/cards', async (req, res) => {
    try {
        // Usa async/await para manejar la consulta
        const [results] = await pool.query('SELECT * FROM servicios');
        res.json(results); // Responde con los resultados en formato JSON
    } catch (err) {
        console.error("Error en la consulta de cards:", err);
        res.status(500).send('Error en la base de datos');
    }
});