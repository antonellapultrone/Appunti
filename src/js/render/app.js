import { renderNav, menuData } from "./header.js";
//render de cards, no importa cual, se importa la funcion y los datos
const header = document.querySelector('header');
renderNav(header, menuData);
import { renderCards, cardJson } from "./card.js";
import { renderButtonsCarrusel, initCarrusel } from "./carrusel.js";
import { renderBtnCategorias, btnActive, categorias, imagenes} from "./categorias.js";
//se crean los root corespondientes
const rootDescubreZona = document.getElementById("section-descubreTuZona");
const rootCategorias = document.getElementById("section-categorias");
//se llaman las funciones para renderizar las cards con sus respectivos roots
renderCards(rootDescubreZona, cardJson, 'carousel-1');
renderCards(rootCategorias, cardJson, 'carousel-2');
//render de botones
renderButtonsCarrusel(rootDescubreZona, 'carousel-1');
renderBtnCategorias(categorias, imagenes);
renderButtonsCarrusel(rootCategorias, 'carousel-2');
//
initCarrusel('carousel-1');
initCarrusel('carousel-2');

btnActive();

/* const express = require('express');
const app = express(); */

//REVISAR
/* const db = require('../../backend/db.js');

db.query('SELECT 1 + 1 AS result')
    .then(([rows, fields]) => {
        console.log('Conexión exitosa:', rows);
    })
    .catch(err => {
        console.error('Error de conexión:', err);
    }); */

/* app.use(express.json());

// Crear publicación
app.post('/publicaciones', async (req, res) => {
    const { titulo, descripcion, precio, emprendedor_id } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO publicaciones (titulo, descripcion, precio, emprendedor_id) VALUES (?, ?, ?, ?)',
            [titulo, descripcion, precio, emprendedor_id]
        );
        res.status(201).json({ id: result.insertId, titulo, descripcion, precio });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
});

// Endpoint de ejemplo para reservas de servicios
app.post('/reservas', async (req, res) => {
    const { cliente_id, publicacion_id, fecha_reserva } = req.body;
    try {
        const [result] = await db.query(
        'INSERT INTO reservas (cliente_id, publicacion_id, fecha_reserva) VALUES (?, ?, ?)',
        [cliente_id, publicacion_id, fecha_reserva]
    );
        res.status(201).json({ id: result.insertId, cliente_id, publicacion_id, fecha_reserva });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000')); */
