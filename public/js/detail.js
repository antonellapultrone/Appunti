import {renderButtonsCarrusel, initCarrusel} from './carrusel.js';


//carousel
document.addEventListener('DOMContentLoaded', async () => {
    const rootImagen = document.getElementById("detalle-boton");
    renderButtonsCarrusel(rootImagen, 'boton');
    initCarrusel('boton');

    // Si usas estas funciones, asegúrate de que estén definidas
    renderBtnCategorias(categorias, imagenes);
    btnActive();
});

document.addEventListener("DOMContentLoaded", () => {
    const mockData = {
        id: 1,
        nombre: "Cancha de Tenis",
        descripcion: "Cancha profesional de tenis con excelente iluminación y servicios adicionales.",
        precio: 2000,
        imagen: "../assets/img/card-futbol1.jpg", // Usa una imagen que tengas en tu carpeta
        ubicacion: "Av. Principal 123",
        mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093176!2d-122.41941548468294!3d37.77492927975901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c2b8ed57%3A0x9eb4a273b7d7b81!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1672518489267!5m2!1sen!2sus"
    };

    // Renderiza datos estáticos
    document.getElementById("imagen-servicio").src = mockData.imagen;
    document.getElementById("nombre-servicio").textContent = mockData.nombre;
    document.getElementById("precio-servicio").textContent = mockData.precio;
    document.getElementById("descripcion-servicio").textContent = mockData.descripcion;
    document.getElementById("ubicacion-servicio").textContent = mockData.ubicacion;
    document.getElementById("mapa-ubicacion").src = mockData.mapa;

    // Agrega evento para la selección de horas
    const horasSelect = document.getElementById("horas-reserva");
    const precioSpan = document.getElementById("precio-servicio");
    horasSelect.addEventListener("change", () => {
        const horas = parseInt(horasSelect.value);
        const precioTotal = mockData.precio * horas;
        precioSpan.textContent = `${precioTotal}`;
    });

    // Acción de reservar
    document.getElementById("btn-reservar").addEventListener("click", () => {
        alert(`Reserva confirmada para ${mockData.nombre}`);
    });
});

/*import { renderNav, menuData } from "./header.js";
import { renderFooter } from "./footer.js";

// Cargar Header y Footer
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    renderNav(header, menuData);
    renderFooter(footer);
});

// Obtener datos del servicio
const fetchServiceData = async (id) => {
    try {
        const response = await fetch(`/api/servicios/${id}`);
        if (!response.ok) throw new Error("Error al obtener el servicio.");
        return await response.json();
    } catch (error) {
        console.error(error);
        alert("No se pudo cargar el servicio.");
    }
};

// Renderizar el detalle del servicio
const renderDetalleServicio = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("No se encontró el ID del servicio.");
        window.location.href = "/"; // Redirige a la home
        return;
    }

    const servicio = await fetchServiceData(id);

    if (servicio) {
        document.getElementById("imagen-servicio").src = servicio.imagen;
        document.getElementById("nombre-servicio").textContent = servicio.nombre;
        document.getElementById("precio-servicio").textContent = servicio.precio;
        document.getElementById("descripcion-servicio").textContent = servicio.descripcion;
        document.getElementById("ubicacion-servicio").textContent = servicio.ubicacion;
        document.getElementById("mapa-ubicacion").src = servicio.mapa;

        // Actualizar precio total según las horas seleccionadas
        const horasSelect = document.getElementById("horas-reserva");
        const precioSpan = document.getElementById("precio-servicio");
        horasSelect.addEventListener("change", () => {
            const horas = parseInt(horasSelect.value);
            const precioTotal = servicio.precio * horas;
            precioSpan.textContent = `$${precioTotal}`;
        });

        // Acción al reservar
        document.getElementById("btn-reservar").addEventListener("click", () => {
            alert(`Reserva confirmada para ${servicio.nombre}`);
        });
    }
};

// Ejecutar renderizado del detalle
renderDetalleServicio();*/