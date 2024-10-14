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
export function renderCards(root ,cardJson, carouselId){
    const div = document.createElement('div');
    div.setAttribute('id', `${carouselId}`);
    div.setAttribute('class',"container-cards");
    for (let i = 0; i < cardJson.length; i++) {
        let article = document.createElement("article");
        article.setAttribute('class',"card")
        article.innerHTML= `
                            <img src = "${cardJson[i].img}" alt = "">
                            <button class = "btn-favorito"><img src="../assets/img/star.png" alt=""></button>
                            <div>
                                <h3>${cardJson[i].nombre}</h3>
                                <!-- traer ubicacion del objeto -->
                                <p><span>Ubicacion</span></p>
                                <p>${cardJson[i].descripcion}</p>
                            </div>
                            <button
                            class="btn-reservar">Reservar</button>
                            `
        div.appendChild(article);
    }
    root.appendChild(div);
}