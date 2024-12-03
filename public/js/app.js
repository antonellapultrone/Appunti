// RENDER NAV
import { renderNav, menuData } from "./header.js";
const header = document.querySelector('header');
renderNav(header, menuData);

// IMPORTAR FUNCIONES Y DATOS
import { renderButtonsCarrusel, initCarrusel } from "../js/carrusel.js";
import { renderBtnCategorias, btnActive, categorias, imagenes } from "./categorias.js"
import { fetchCardData } from "./api-service.js";
import { renderCards } from "./card.js";
import { renderFooter } from "./footer.js";


document.addEventListener('DOMContentLoaded', async () => {
    const rootDescubreZona = document.getElementById("section-descubreTuZona");
    const rootCategorias = document.getElementById("section-categorias");
    

    const cardJson = await fetchCardData();

    renderCards(rootDescubreZona, cardJson, 'carousel-1');
    renderCards(rootCategorias, cardJson, 'carousel-2');
    renderButtonsCarrusel(rootDescubreZona, 'carousel-1');
    renderButtonsCarrusel(rootCategorias, 'carousel-2');
    initCarrusel('carousel-1');
    initCarrusel('carousel-2');

    renderBtnCategorias(categorias, imagenes);
    btnActive();
});

//RENDER FOOTER
const footer = document.querySelector('footer');
renderFooter(footer);