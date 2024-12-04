import * as Carrusel from './carrusel.js';
import { renderCards } from "./card.js";
import { getAllCards } from './carrusel.js';

const rootFavoritos = document.getElementById("favoritos-contenedor");
const cardJson = await getAllCards();

renderCards(rootFavoritos, cardJson, 'favoritos');
Carrusel.renderButtonsCarrusel(rootFavoritos, 'favoritos');
Carrusel.initCarrusel('favoritos');

document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
});

async function fetchUserData() {
    const token = localStorage.getItem('token'); // O sessionStorage
    const response = await fetch('http://localhost:3000/api/users/session', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const userData = await response.json();
        console.log(userData);
    } else {
        console.error('Error:', await response.json());
    }
}