import {renderButtonsCarrusel, initCarrusel} from './carrusel.js';
import { renderCards, getAllCards } from "./card.js"
import {renderBtnCategorias, btnActive, imagenes, categorias} from './categorias.js'

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