import pool from '../config/conection.js';

export const getAllCards = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM servicios');
        //console.log(results);
        res.json(results); // Responde con los resultados en formato JSON
    } catch (err) {
        console.error("Error en la consulta de cards:", err);
        res.status(500).send('Error en la base de datos');
    }
};