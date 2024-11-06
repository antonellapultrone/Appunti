import { renderNav, menuData } from "./header.js";
//render de cards, no importa cual, se importa la funcion y los datos
const header = document.querySelector('header');
renderNav(header, menuData);
import { renderCards, cardJson } from "./card.js";
import { renderButtonsCarrusel, carrusel } from "./carrusel.js";
import { renderBtnCategorias, btnActive, categorias, imagenes} from "./categorias.js";
//se crean los root corespondientes
const rootDescubreZona = document.getElementById("section-descubreTuZona");
const rootCategorias = document.getElementById("section-categorias");
//se llaman las funciones para renderizar las cards con sus respectivos roots
renderCards(rootDescubreZona, cardJson, 'carousel-1');
renderCards(rootCategorias, cardJson, 'carousel-2');
//render de botones
renderButtonsCarrusel(rootDescubreZona, 'carousel-1');
renderBtnCategorias(categorias, imagenes);
renderButtonsCarrusel(rootCategorias, 'carousel-2');
//
carrusel('carousel-1');
carrusel('carousel-2');

btnActive();

function validateForm() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const formMessage = document.getElementById("formMessage");

    // Verificar que todos los campos estén llenos
    if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
        formMessage.textContent = "Por favor, completa todos los campos.";
        return false;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        formMessage.textContent = "Las contraseñas no coinciden.";
        return false;
    }

    // Mostrar mensaje de éxito
    formMessage.textContent = "¡Registro exitoso!";
    formMessage.style.color = "green";
    return false; // Evita el envío real del formulario
}