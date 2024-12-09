
// Variables para los filtros y contenedor de tarjetas
const ciudadSelect = document.getElementById("ciudad");
const categorySelect = document.getElementById("categoria");
const priceSelect = document.getElementById("precio");
const diasSelect = document.getElementById("dia_semana");
const duracionSelect = document.getElementById("duracion_hora");
const filterButton = document.getElementById("button-filter");
const cardsResults = document.getElementById("cards-container-filter");

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query'); // Obtiene el término de búsqueda
    console.log(urlParams);
    // Si existe el término de búsqueda, lo mostramos y buscamos los servicios
    if (searchQuery) {
        document.getElementById('resultadoBusqueda').innerText = `Resultados para: "${searchQuery}"`;
        await init(searchQuery); // Pasa el término de búsqueda para filtrar servicios
    } else {
        document.getElementById('resultadoBusqueda').innerText = 'Por favor, ingresa un término para buscar.';
        await init(); // Llamar a init sin parámetro si no hay término de búsqueda
    }
};

async function fetchServices(searchQuery) {
    cardsResults.innerHTML = "<p>Cargando servicios...</p>";
    try {
        const url = searchQuery ? `http://localhost:3000/api/service/search/${encodeURIComponent(searchQuery)}`  : "http://localhost:3000/api/service";
        const response = await fetch(url);
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
function filterServices(services, searchQuery = "") {
    // Parámetros obtenidos de los selectores y filtros
    const ciudadFilter = ciudadSelect ? ciudadSelect.value : "Todos";
    const categoria = categorySelect ? categorySelect.value : "Todos";
    const precio = priceSelect ? priceSelect.value : "Todos";
    const dias = diasSelect ? diasSelect.value : "Todos";
    const duracion = duracionSelect ? duracionSelect.value : "Todos";

    const precioRangos = {
        "0 a 5000": [0.00, 5000.00],
        "5000 a 10000": [5000.01, 10000.00],
        "15000 a 20000": [15000.01, 20000.00],
        "20000 o más": [20001.00, Infinity],
    };

    const lowerSearchQuery = searchQuery.toLowerCase();

    // Filtrar servicios según todos los criterios
    return services.filter(service => {
        const [min, max] = precioRangos[precio] || [0, Infinity];

        const matchesSearchQuery =
            !searchQuery || // Si no hay término, no filtrar por búsqueda
            service.nombre.toLowerCase().includes(lowerSearchQuery) ||
            service.categoria.toLowerCase().includes(lowerSearchQuery) ||
            service.ciudad.toLowerCase().includes(lowerSearchQuery);

        return (
            matchesSearchQuery && // Filtro por búsqueda
            (ciudadFilter === "Todos" || service.ciudad === ciudadFilter) &&
            (categoria === "Todos" || service.categoria === categoria) &&
            (precio === "Todos" || (service.precio >= min && service.precio <= max)) &&
            (dias === "Todos" || service.dia_semana === dias) && // Si es lista/string
            (duracion === "Todos" || service.duracion_hora === parseInt(duracion)) // Si es número
        );
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

async function init(searchQuery) {
    const servicios = await fetchServices(); // Obtener servicios
    const filteredServices = filterServices(servicios, searchQuery); // Aplicar búsqueda y filtros
    renderCards(filteredServices); // Mostrar resultados
}