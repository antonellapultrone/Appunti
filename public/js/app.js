// RENDER NAV
import { renderNav, menuData } from "./header.js";
const header = document.querySelector('header');
renderNav(header, menuData);

import { renderFooter } from "./footer.js";

//RENDER FOOTER
const footer = document.querySelector('footer');
renderFooter(footer);