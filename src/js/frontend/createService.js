import { renderNav, menuData } from "./header.js";
//render de cards, no importa cual, se importa la funcion y los datos
const header = document.querySelector('header');
renderNav(header, menuData);