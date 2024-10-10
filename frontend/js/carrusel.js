export function renderButtonsCarrusel(root){
    const div = document.createElement('div');
    div.setAttribute('class', 'container-buttons');
    div.innerHTML = `
                    <button class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=1806&format=png&color=ffffff" alt=""></button>
                    <button class="buttons-carrusel"><img src="https://img.icons8.com/?size=100&id=61&format=png&color=ffffff" alt=""></button>
                    `
    root.appendChild(div);
}