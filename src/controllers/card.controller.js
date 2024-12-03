import pool from '../config/conection.js';

export const getAllCards = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM servicios');
        res.json(results); // Responde con los resultados en formato JSON
    } catch (err) {
        console.error("Error en la consulta de cards:", err);
        res.status(500).send('Error en la base de datos');
    }
};

/* export async function fetchCardData() {
    try {
        const response = await fetch('/api/cards');
        if (!response.ok) throw new Error('Error en la solicitud');
        const cardData = await response.json();
        return cardData;
    } catch (error) {
        console.error('Error al obtener los datos de las tarjetas:', error);
        return [];
    }
} */