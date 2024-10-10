
//render de cards, no importa cual, se importa la funcion y los datos
import { renderCards, cardJson } from "./card.js";
import { renderButtonsCarrusel } from "./carrusel.js";
//se crean los root corespondientes
const rootDescubreZona = document.getElementById("section-descubreTuZona");
const rootCategorias = document.getElementById("section-categorias");
//se llaman las funciones para renderizar las cards con sus respectivos roots
renderCards(rootDescubreZona, cardJson);
renderCards(rootCategorias, cardJson)
//render de botones
renderButtonsCarrusel(rootDescubreZona);
renderButtonsCarrusel(rootCategorias);