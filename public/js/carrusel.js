import {renderCards} from './card.js'
import {renderBtnCategorias, btnActive, categorias, imagenes} from './categorias.js'

export function renderButtonsCarrusel(root, carouselId) {
    const div = document.createElement('div');
    div.setAttribute('class', 'container-buttons');
    div.innerHTML = `
                    <button id="${carouselId}-btn-izq" class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=1806&format=png&color=ffffff" alt=""></button>
                    <button id="${carouselId}-btn-der" class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=61&format=png&color=ffffff" alt=""></button>
                    `;
    root.appendChild(div);
}

export function initCarrusel(carouselId) {
    // Primero verifica que el contenedor del carrusel existe
    const carouselContainer = document.getElementById(carouselId);
    if (!carouselContainer) {
        console.error(`Error: No se encontró un elemento con el ID "${carouselId}".`);
        return;
    }

    // Luego selecciona el contenedor de las tarjetas dentro del carrusel
    const carousel = carouselContainer.querySelector('.cards-wrapper');
    if (!carousel) {
        console.error(`Error: No se encontró un elemento con la clase "cards-wrapper" dentro de #${carouselId}.`);
        return;
    }

    // Selecciona los botones de desplazamiento usando el ID del carrusel
    const btnIzq = document.getElementById(`${carouselId}-btn-izq`);
    const btnDer = document.getElementById(`${carouselId}-btn-der`);

    // Verifica si los botones existen en el DOM
    if (!btnIzq || !btnDer) {
        console.error(`Error: No se pudieron encontrar los botones de navegación para el carrusel "${carouselId}".`);
        return;
    }

    // Tamaño del desplazamiento horizontal en píxeles
    const scrollAmount = 600;

    // Evento para desplazar hacia la izquierda
    btnIzq.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Evento para desplazar hacia la derecha
    btnDer.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

//ver si es especifico de carrusel
export async function getAllCards() {
    try {
        const response = await fetch('/api/cards'); // Llama al endpoint del backend
        if (!response.ok) throw new Error('Error en la solicitud');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener las tarjetas:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const rootDescubreZona = document.getElementById("section-descubreTuZona");
    const rootCategorias = document.getElementById("section-categorias");
    
    const cardJson = await getAllCards();

    renderCards(rootDescubreZona, cardJson, 'carousel-1');
    renderCards(rootCategorias, cardJson, 'carousel-2');
    renderButtonsCarrusel(rootDescubreZona, 'carousel-1');
    renderButtonsCarrusel(rootCategorias, 'carousel-2');
    initCarrusel('carousel-1');
    initCarrusel('carousel-2');

    // Si usas estas funciones, asegúrate de que estén definidas
    renderBtnCategorias(categorias, imagenes);
    btnActive();
});