import * as Carrusel from './carrusel.js';
import { fetchCardData } from "./api-service.js";
import { renderCards } from "./card.js";

const rootFavoritos = document.getElementById("favoritos-contenedor");
const cardJson = await fetchCardData();

renderCards(rootFavoritos, cardJson, 'favoritos');
Carrusel.renderButtonsCarrusel(rootFavoritos, 'favoritos');
Carrusel.initCarrusel('favoritos');