export const cardJson = [
        {
            id:1,
            nombre: "cancha futbol",
            descripcion: "Cancha al aire libre",
            img: "../assets/img/card-futbol1.jpg",
            favorito: false
        },
        {
            id:2,
            nombre: "cancha Tenis",
            descripcion: "Cancha de tenis al aire libre",
            img: "../assets/img/card-tenis1.png",
            favorito: false
        },
        {
            id:3,
            nombre: "cancha futbol2",
            descripcion: "Cancha al aire libre",
            img: "../assets/img/card-futbol1.jpg",
            favorito: true
        },
        {
            id:4,
            nombre: "cancha Tenis2",
            descripcion: "Cancha de tenis al aire libre",
            img: "../assets/img/card-tenis1.png",
            favorito: false
        },
        {
            id:1,
            nombre: "cancha futbol",
            descripcion: "Cancha al aire libre",
            img: "../assets/img/card-futbol1.jpg",
            favorito: false
        },
        {
            id:2,
            nombre: "cancha Tenis",
            descripcion: "Cancha de tenis al aire libre",
            img: "../assets/img/card-tenis1.png",
            favorito: false
        },
        {
            id:3,
            nombre: "cancha futbol2",
            descripcion: "Cancha al aire libre",
            img: "../assets/img/card-futbol1.jpg",
            favorito: true
        },
        {
            id:4,
            nombre: "cancha Tenis2",
            descripcion: "Cancha de tenis al aire libre",
            img: "../assets/img/card-tenis1.png",
            favorito: false
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
    for (let i = 0; i < cardJson.length; i++) {
        let article = document.createElement("article");
        article.setAttribute('class', "card");
        article.innerHTML = `
            <img src="${cardJson[i].img}" alt="">
            <button class="btn-favorito"><img src="../assets/img/star.png" alt=""></button>
            <div>
                <h3>${cardJson[i].nombre}</h3>
                <p><span>Ubicación</span></p>
                <p>${cardJson[i].descripcion}</p>
            </div>
            <button class="btn-reservar">Reservar</button>
        `;
        cardsWrapper.appendChild(article); // Añadir cada tarjeta al contenedor de tarjetas
    }

    root.appendChild(carouselContainer); // Añadir el contenedor del carrusel al root
}