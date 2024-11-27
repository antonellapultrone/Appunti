const rootCardCategorias  = document.getElementById('container-categorias');
export const categorias = ['Deportes', ' Estetica', 'Comida', 'Oficio', 'Vehiculos', 'Salud', 'Bienestar', 'Mascotas', 'Eventos', 'Promos']
export const imagenes = ['https://img.icons8.com/?size=100&id=18198&format=png&color=575757', 'https://img.icons8.com/?size=100&id=10367&format=png&color=575757', 'https://img.icons8.com/?size=100&id=NTPjDyGAVp1r&format=png&color=575757', 'https://img.icons8.com/?size=100&id=11219&format=png&color=575757', 'https://img.icons8.com/?size=100&id=12666&format=png&color=575757', 'https://img.icons8.com/?size=100&id=akthhbuAAlfc&format=png&color=575757', 'https://img.icons8.com/?size=100&id=Z1QQTUu7K1Vk&format=png&color=575757', 'https://img.icons8.com/?size=100&id=106513&format=png&color=575757', 'https://img.icons8.com/?size=100&id=8851&format=png&color=575757', 'https://img.icons8.com/?size=100&id=a99zM4y8YPut&format=png&color=575757']

export function renderBtnCategorias(categorias, imagenes){
    const div = document.createElement('div');
    div.setAttribute('class', 'btn-Category')
    for (let i = 0; i < 10; i++) {
        let a = document.createElement('a');
        a.innerHTML = `
                        <div>
                            <img src="${imagenes[i]}" alt="">
                        </div>
                        <p>${categorias[i]}</p>
                        `
        div.appendChild(a);
    }

    rootCardCategorias.appendChild(div);
}
/* escuchar el evento onclick y traer el nombre del array en esa posicion */
export function btnActive() {
    const btns = document.querySelectorAll('#container-categorias .btn-Category a'); // Selecciona todos los enlaces dentro de .btn-Category

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover la clase activa de todos los botones
            btns.forEach(b => {
                b.classList.remove('active');
                // Restablece el color del texto del p
                const p = b.querySelector('p');
                if (p) {
                    p.style.color = '#575757'; // Color del texto para botones no activos
                }
            });
            // Añadir la clase activa solo al botón clicado
            this.classList.add('active');
            // Cambia el color del p en el botón activo
            const activeP = this.querySelector('p');
            if (activeP) {
                activeP.style.color = '#FFFFFF'; // Cambia este color al que prefieras
            }
        });
    });
}