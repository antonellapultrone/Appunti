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
  const carousel = document.getElementById(`${carouselId}`);
  const btnIzq = document.getElementById(`${carouselId}-btn-izq`);
  const btnDer = document.getElementById(`${carouselId}-btn-der`);

  let currentCardIndex = 0;
  const cards = Array.from(carousel.children);

  const totalCards = cards.length * 2; // El doble, porque las clonamos

  // Función para mover el carrusel
  const moveCarousel = (index) => {
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(${index * -300}px)`;
  };

  // Mover a la izquierda
  btnIzq.addEventListener('click', () => {
      currentCardIndex--;
      moveCarousel(currentCardIndex);

      // Si llegamos al comienzo (tarjetas originales), saltamos a la copia
      if (currentCardIndex < 0) {
          setTimeout(() => {
              carousel.style.transition = "none";
              currentCardIndex = totalCards / 2 - 1; // Última tarjeta de la copia
              carousel.style.transform = `translateX(${currentCardIndex * -300}px)`;
          }, 500);
      }
  });

  // Mover a la derecha
  btnDer.addEventListener('click', () => {
      currentCardIndex++;
      moveCarousel(currentCardIndex);

      // Si llegamos al final (tarjetas duplicadas), saltamos al comienzo
      if (currentCardIndex >= totalCards / 2) {
          setTimeout(() => {
              carousel.style.transition = "none";
              currentCardIndex = 0; // Primera tarjeta original
              carousel.style.transform = `translateX(${currentCardIndex * -300}px)`;
          }, 500);
      }
  });
}

