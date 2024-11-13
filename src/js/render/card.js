export const cardJson = [
        {
            id:1,
            nombre: "cancha futbol",
            descripcion: "Cancha al aire libre",
            imagenes: "../assets/img/card-futbol1.jpg"
        },
        {
            id:2,
            nombre: "cancha Tenis",
            descripcion: "Cancha de tenis al aire libre",
            imagenes: "../assets/img/card-tenis1.png"
        },
        {
            id:3,
            nombre: "cancha futbol2",
            descripcion: "Cancha al aire libre",
            imagenes: "../assets/img/card-paddle1.jpg"
        },
        {
            id:4,
            nombre: "cancha Tenis2",
            descripcion: "Cancha de tenis al aire libre",
            imagenes: "../assets/img/card-tenis1.png"
        }
]
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
            <img src="${card.imagenes}" alt="Imagen de ${card.nombre}">
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
