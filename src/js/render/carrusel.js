export function renderButtonsCarrusel(root, carouselId) {
    const div = document.createElement('div');
    div.setAttribute('class', 'container-buttons');
    div.innerHTML = `
                    <button id="${carouselId}-btn-izq" class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=1806&format=png&color=ffffff" alt=""></button>
                    <button id="${carouselId}-btn-der" class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=61&format=png&color=ffffff" alt=""></button>
                    `;
    root.appendChild(div);
}

export function initCarrusel(carouselId) {
    // Seleccionar el contenedor de las tarjetas y los botones
    const carousel = document.getElementById(carouselId).querySelector('.cards-wrapper');
    const btnIzq = document.getElementById(`${carouselId}-btn-izq`);
    const btnDer = document.getElementById(`${carouselId}-btn-der`);

    // Verifica si el contenedor y botones se seleccionaron correctamente
    if (!carousel || !btnIzq || !btnDer) {
        console.error('Error: No se pudo seleccionar el carrusel o los botones.');
        return;
    }

    // Tamaño del desplazamiento horizontal en píxeles
    const scrollAmount = 600;

    // Evento para desplazar hacia la izquierda
    btnIzq.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Evento para desplazar hacia la derecha
    btnDer.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

