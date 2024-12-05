
// Variables para los filtros y contenedor de tarjetas
const ciudadSelect = document.getElementById("ciudad");
const categorySelect = document.getElementById("categoria");
const priceSelect = document.getElementById("precio");
const diasSelect = document.getElementById("dia_semana");
const duracionSelect = document.getElementById("duracion_hora");
const filterButton = document.getElementById("button-filter");
const cardsResults = document.getElementById("cards-container-filter");

window.onload = function() {
    // Obtener el parámetro "ciudad" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const ciudad = urlParams.get('ciudad');  // Obtiene el valor de "ciudad"

    // Si existe el parámetro "ciudad", mostrarlo en la página
    if (ciudad && ciudad !== "Todos") {
        document.getElementById('resultadoBusqueda').innerHTML = `${ciudad}`;
    } else {
        document.getElementById('resultadoBusqueda').innerHTML = 'Por favor, ingrese una ciudad para buscar.';
    }

    // Inicializar la búsqueda con los servicios
    init();
};

async function fetchServices() {
    cardsResults.innerHTML = "<p>Cargando servicios...</p>";
    try {
        const response = await fetch("http://localhost:3000/api/cards");
        if (!response.ok) throw new Error("Error al obtener los datos");
            const services = await response.json();
        return services;
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        cardsResults.innerHTML = "<p>No se pudieron cargar los servicios. Intenta de nuevo más tarde.</p>";
        return [];
    }
}

function renderCards(services) {
    cardsResults.innerHTML = ""; // Limpiar el contenedor
    if (services.length === 0) {
        cardsResults.innerHTML = "<p>No se encontraron servicios que coincidan con los filtros.</p>";
    } else {

        services.forEach(service => {
            const article = document.createElement("article");
            article.setAttribute('class', "card");
            article.innerHTML = `
                <div class="img-contenedor">
                    <img src="${service.imagenes}" alt="Imagen de ${service.nombre}">
                </div>
                <button class="btn-favorito"><img src="../../assets/img/star.png" alt="Favorito"></button>
                <div>
                    <h3>${service.nombre}</h3>
                    <p><span>Ubicación:</span> ${service.ubicacion}</p>
                    <p><span>Ciudad:</span> ${service.ciudad}</p>
                    <p>${service.descripcion}</p>
                </div>
                <button class="btn-reservar">Reservar</button>
            `;
            // Agregar el evento al botón "Reservar"
            const btnReservar = article.querySelector(".btn-reservar");
            btnReservar.addEventListener("click", () => {
                // Puedes pasarle el ID del servicio o cualquier otro dato que necesites para la página de detalles
                const servicioId = service.ID;  // Asumiendo que tienes un campo 'id' en tu servicio
                window.location.href = `/detalle-reserva.html?id=${servicioId}`;  // Redirige con el ID del servicio
            });

            cardsResults.appendChild(article); // Añadir cada tarjeta al contenedor de tarjetas
        });

    }
}
// Función para aplicar los filtros
function filterServices(services) {
    const ciudad = ciudadSelect.value;
    const categoria = categorySelect.value;
    const precio = priceSelect.value;
    const dias = diasSelect.value;
    const duracion = duracionSelect.value;

    const precioRangos = {
        "0 a 5000": [0.00, 5000.00],
        "5000 a 10000": [5000.01, 10000.00],
        "15000 a 20000": [15000.01, 20000.00],
        "20000 o más": [20001.00, Infinity],
    };

    return services.filter(service => {
        const [min, max] = precioRangos[precio] || [0, Infinity];

        return (
            
            (ciudad === "Todos" || service.ciudad === ciudad) &&
            (categoria === "Todos" || service.categoria === categoria) &&
            (precio === "Todos" || (service.precio >= min && service.precio <= max)) &&
            (dias === "Todos" || service.dia_semana === dias)) && // Para listas o strings
            (duracion === "Todos" || service.duracion_hora === parseInt(duracion)) // Convertir a string si es necesario
    });
}


// Evento para el botón de filtrar
filterButton.addEventListener("click", async () => {
    try {
        const services = await fetchServices(); // Si ya los tienes, usa una variable global
        const filteredServices = filterServices(services);
        renderCards(filteredServices);
    } catch (error) {
        console.error("Error al filtrar servicios:", error);
        cardsResults.innerHTML = "<p>No se pudieron aplicar los filtros. Intenta de nuevo más tarde.</p>";
    }
});

async function init() {
    const servicios = await fetchServices(); // Sin argumentos
    renderCards(servicios);
}