import * as Carrusel from './carrusel.js';
import { renderCards } from "./card.js";
import { getAllCards } from './carrusel.js';

const rootFavoritos = document.getElementById("favoritos-contenedor");
const cardJson = await getAllCards();

renderCards(rootFavoritos, cardJson, 'favoritos');
Carrusel.renderButtonsCarrusel(rootFavoritos, 'favoritos');
Carrusel.initCarrusel('favoritos');

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
});

function loadUserData() {
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userLastName = sessionStorage.getItem('userLastName');
    const userEmail = sessionStorage.getItem('userEmail');
    const userPhoto = sessionStorage.getItem('userPhoto');
    const userAddress = sessionStorage.getItem('userAddress');
    const userEntrepreneur = sessionStorage.getItem('userEntrepreneur');

    if (userId) {
        document.getElementById('userName').textContent = userName || 'No disponible';
        document.getElementById('lastName').textContent = userLastName || 'No disponible';
        document.getElementById('userAddress').textContent = userAddress || 'No disponible';
        document.getElementById('userEmail').textContent = userEmail || 'No disponible';
        // Si tienes un campo para el teléfono, puedes agregarlo aquí
        document.getElementById('userPhone').textContent = 'Teléfono no disponible'; // Ajusta según tu lógica
    } else {
        console.log('No hay sesión activa.');
        // Redirigir a la página de inicio de sesión o mostrar un mensaje
    }
}