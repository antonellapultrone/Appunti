//no esta entrando aca
import { renderButtonsCarrusel, initCarrusel } from './carrusel.js';
import { renderCards, getAllCards } from './card.js';

document.addEventListener('DOMContentLoaded', async () => {
    const rootFavoritos = document.getElementById("favoritos-contenedor");
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token no encontrado. Redirigiendo a login.');
        window.location.href = 'http://localhost:3000/views/login.html'; // Corregir URL
        return;
    }

    try {
        // Verificar datos de sesión
        const response = await fetch('/api/user/session', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById('userName').innerText = userData.nombre || 'N/A';
            document.getElementById('userLastName').innerText = userData.apellido || 'N/A';
            document.getElementById('userEmail').innerText = userData.email || 'N/A';
            document.getElementById('userAddress').innerText = userData.direccion || 'N/A';
            //document.getElementById('date').innerText = userData.direccion || 'N/A';

            // Cargar y renderizar las cards
            const cardJson = await getAllCards();

            if (rootFavoritos && cardJson) {
                renderCards(rootFavoritos, cardJson, 'favoritos');
                renderButtonsCarrusel(rootFavoritos, 'favoritos');
                initCarrusel('favoritos');
            } else {
                console.error('Error: contenedor o datos de tarjetas no disponibles.');
            }
        } else {
            //esta entrando aca
            console.error('Error al obtener datos de sesión. Redirigiendo a login.');
            //window.location.href = 'http://localhost:3000/views/login.html'; // Corregir URL'¿
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        window.location.href = 'http://localhost:3000/views/login.html'; // Corregir URL
    }
});
