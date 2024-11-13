// RENDER NAV
import { renderNav, menuData } from "./header.js";
const header = document.querySelector('header');
renderNav(header, menuData);

// IMPORTAR FUNCIONES Y DATOS
import { renderButtonsCarrusel, initCarrusel } from "./carrusel.js";
import { renderBtnCategorias, btnActive, categorias, imagenes } from "./categorias.js";
import { fetchCardData } from "./api-service.js";
import { renderCards } from "./card.js";

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    // Selecciona los elementos root
    const rootDescubreZona = document.getElementById("section-descubreTuZona");
    const rootCategorias = document.getElementById("section-categorias");

    // Obtener los datos de las tarjetas desde la API
    const cardJson = await fetchCardData();

    // Renderizar las cards en los respectivos contenedores
    renderCards(rootDescubreZona, cardJson, 'carousel-1');
    renderCards(rootCategorias, cardJson, 'carousel-2');

    // Renderizar los botones de carrusel
    renderButtonsCarrusel(rootDescubreZona, 'carousel-1');
    renderButtonsCarrusel(rootCategorias, 'carousel-2');

    // Renderizar las categorías y activar el botón de categorías
    renderBtnCategorias(categorias, imagenes);
    btnActive();

    // Inicializar los carruseles
    initCarrusel('carousel-1');
    initCarrusel('carousel-2');
});
