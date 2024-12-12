import {renderButtonsCarrusel, initCarrusel} from './carrusel.js';
import { renderCards, getAllCards , getCardsByCategory} from "./card.js"
import {renderBtnCategorias, btnActive, imagenes, categorias} from './categorias.js'

document.addEventListener('DOMContentLoaded', async () => {
    const rootDescubreZona = document.getElementById("section-descubreTuZona");
    const rootCategorias = document.getElementById("section-categorias");
    const carousel2 = document.getElementById("carousel-2");
    const cardsContainer = document.getElementById('cards-container-0');
    let categoriaSeleccionada = null;

    // Si usas estas funciones, asegúrate de que estén definidas
    renderBtnCategorias(categorias, imagenes);

    if (!categoriaSeleccionada) {
        const cardJson = await getAllCards();
        renderCards(rootCategorias, cardJson, 'carousel-2');
      }
    
    document.querySelectorAll('.categoria').forEach((categoria) => {
        categoria.addEventListener('click', async (e) => {
            categoriaSeleccionada = e.target.dataset.categoria;
            btnActive(e.target);
            console.log(carousel2);
             // Elimina las cards anteriores
             cardsContainer.innerHTML = '';
             console.log(carousel2);
            console.log("hasta aca" +rootCategorias);

            // Llama a getCardsByCategory y envía el resultado a renderCards
            const cardJson = await getCardsByCategory(categoriaSeleccionada);
            renderCards(carousel2, cardJson, 'carousel-2');
            renderButtonsCarrusel(rootCategorias, 'carousel-2'); 
            initCarrusel('carousel-2');
        });
    });

    const cardJson = await getAllCards();

    renderCards(rootDescubreZona, cardJson, 'carousel-1');
    renderButtonsCarrusel(rootCategorias, 'carousel-2');
    renderButtonsCarrusel(rootDescubreZona, 'carousel-1');
    initCarrusel('carousel-1');
    initCarrusel('carousel-2');

    
    btnActive();
});