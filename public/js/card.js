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
            <button class="btn-favorito"><img src="../../assets/img/star.png" alt="Favorito"></button>
            <div>
                <h3>${card.nombre}</h3>
                <p><span>Ubicación:</span> ${card.ubicacion}</p>
                <p>${card.descripcion}</p>
            </div>
            <button class="btn-reservar">Reservar</button>
        `;
        cardsWrapper.appendChild(article); // Añadir cada tarjeta al contenedor de tarjetas
    });

    root.appendChild(carouselContainer); // Añadir el contenedor del carrusel al root
}