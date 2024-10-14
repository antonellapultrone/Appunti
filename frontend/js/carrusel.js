export function renderButtonsCarrusel(root, carouselId) {
    const div = document.createElement('div');
    div.setAttribute('class', 'container-buttons');
    div.innerHTML = `
                    <button id="${carouselId}-btn-izq" class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=1806&format=png&color=ffffff" alt=""></button>
                    <button id="${carouselId}-btn-der" class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=61&format=png&color=ffffff" alt=""></button>
                    `
    root.appendChild(div);
}
export function carrusel(carouselId) {
  const carousel = document.getElementById(carouselId).querySelector('.cards-wrapper');
  const btnIzq = document.getElementById(`${carouselId}-btn-izq`);
  const btnDer = document.getElementById(`${carouselId}-btn-der`);

  let currentCardIndex = 0;
  const cards = Array.from(carousel.children);
  const visibleCardsCount = 4; // Cantidad de tarjetas visibles
  const totalCards = cards.length; // Total de tarjetas

  const cardWidth = 600; // Ancho de cada tarjeta

  // Función para mover el carrusel
  const moveCarousel = (index) => {
      carousel.style.transform = `translateX(${-index * cardWidth}px)`;
  };

  // Mover a la izquierda
  btnIzq.addEventListener('click', () => {
      currentCardIndex--;
      if (currentCardIndex < 0) {
          currentCardIndex = totalCards - visibleCardsCount; // Volver al final
      }
      moveCarousel(currentCardIndex);
  });

  // Mover a la derecha
  btnDer.addEventListener('click', () => {
      currentCardIndex++;
      if (currentCardIndex >= totalCards - visibleCardsCount + 1) {
          currentCardIndex = 0; // Volver al inicio
      }
      moveCarousel(currentCardIndex);
  });

  // Inicializar el carrusel en la posición correcta
  moveCarousel(currentCardIndex);
}