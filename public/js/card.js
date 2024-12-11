export function renderCards(root, cardJson, carouselId) {
    // Crear el contenedor del carrusel
    const carouselContainer = document.createElement('div');
    carouselContainer.setAttribute('id', `${carouselId}`);
    carouselContainer.setAttribute('class', "container-cards");

    // Crear el contenedor para las tarjetas
    const cardsWrapper = document.createElement('div');
    cardsWrapper.setAttribute('class', "cards-wrapper"); // Clase para el contenedor de las tarjetas
    carouselContainer.appendChild(cardsWrapper);

    // Renderizar las tarjetas
    cardJson.forEach(card => {
        const article = document.createElement("article");
        article.setAttribute('class', "card");
        article.innerHTML = `
            <div class="img-contenedor">
                <img src="${card.imagenes}" alt="Imagen de ${card.nombre}">
            </div>
            <button class="btn-favorito">
                <img src="../../assets/img/star.png" alt="Favorito">
            </button>
            <div>
                <h3>${card.nombre}</h3>
                <p><span>Ubicación:</span> ${card.ubicacion}</p>
                <p class="description">${card.descripcion}</p>
            </div>
            <a href="#" class="btn-reservar" data-id="${card.ID}">Reservar</a>
        `;
        
        // Agregar el evento al botón "Reservar"
        // Agregar el evento al botón "Reservar"
        const btnReservar = article.querySelector(".btn-reservar");
        btnReservar.addEventListener("click", async (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace
            const servicioId = btnReservar.getAttribute('data-id'); // Obtener el ID del servicio

            // Redirigir a details.html con el ID del servicio
            window.location.href = `/views/detail.html?id=${servicioId}`; // Asegúrate de que la ruta sea correcta
        });

        cardsWrapper.appendChild(article); // Añadir cada tarjeta al contenedor de tarjetas
    });

    root.appendChild(carouselContainer); // Añadir el contenedor del carrusel al root
}

export async function getAllCards() {
    try {
        const response = await fetch('/api/cards'); // Llama al endpoint del backend
        if (!response.ok) throw new Error('Error en la solicitud');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener las tarjetas:', error);
        return [];
    }
}