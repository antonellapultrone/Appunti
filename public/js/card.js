export function renderCards(root, cardJson, carouselId) {
    // Crear el contenedor del carrusel
    const carouselContainer = document.createElement('div');
    carouselContainer.setAttribute('id', `${carouselId}`);
    carouselContainer.setAttribute('class', "container-cards");

    // Crear el contenedor para las tarjetas
    const cardsWrapper = document.createElement('div');
    cardsWrapper.setAttribute('class', "cards-wrapper");
    carouselContainer.appendChild(cardsWrapper);

    cardJson.forEach(card => {

        const article = document.createElement("article");
        article.setAttribute('class', "card");
        
        // Manejar múltiples formas de obtener la URL de la imagen
        const imageUrl = card.imagenes && card.imagenes.length > 0 
            ? card.imagenes[0] 
            : card.imagen_url 
            ? card.imagen_url 
            : '../assets/img/mago-frente.jpg';

        article.innerHTML = `
            <div class="img-contenedor">
                <img src="${imageUrl}" alt="Imagen de ${card.nombre}">
            </div>
            <button class="btn-favorito"><img src="../../assets/img/star.png" alt="Favorito"></button>
            <div>
                <h3>${card.nombre}</h3>
                <p><span>Ubicación:</span> ${card.ubicacion || 'No especificado'}</p>
                <p class="description">${card.descripcion}</p>
            </div>
            <a href="#" class="btn-reservar" data-id="${card.ID}">Reservar</a>
        `;
        
        // Agregar el evento al botón "Reservar"
        const btnReservar = article.querySelector(".btn-reservar");
        btnReservar.addEventListener("click", async (event) => {
            event.preventDefault();
            const servicioId = btnReservar.getAttribute('data-id');
            window.location.href = `/views/detail.html?id=${servicioId}`;
        });

        cardsWrapper.appendChild(article);
    });

    root.appendChild(carouselContainer);
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