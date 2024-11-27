export const menuData = [
    {
        name: "Home",
        img: "../assets/icon/mago-pesc-light.png",
        url:"../../views/home.html"
    },
    {
        name: "Promos",
        img: "https://img.icons8.com/?size=100&id=a99zM4y8YPut&format=png&color=ffffff",
        url:"../../views/promos.html"
    },
    {
        name: "Categorias",
        img: "https://img.icons8.com/?size=100&id=Ah8SLaXAg94W&format=png&color=ffffff",
        url:"../../views/categorias.html"
    
    },
    {
        name: "Mis Reservas",
        img: "https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff",
        url:"../../views/mis-reservas.html"
    },
    {
        name: "Registrarse",
        img: "https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=ffffff",
        url:"../../views/register.html"
    }
]
export function renderNav(root, menuItems) {
    let nav = document.createElement('nav');
    root.appendChild(nav);
    let ul = document.createElement('ul');
    nav.appendChild(ul);

    for(let i  = 0; i < 1; i++){
        let li = document.createElement('li');
        li.innerHTML = `
                        <a href="${menuItems[i].url}">
                            <img src="${menuItems[i].img}" alt="">
                            ${menuItems[i].name}
                        </a>
                        `;
        ul.appendChild(li);
    }
    let divBuscador = document.createElement('div')
    divBuscador.setAttribute('class', 'buscador');
    divBuscador.innerHTML = `
            <form action="">
                <input id="ubicacion" type="text" placeholder="Busca reservas, servicios y mas...">
                <button><img src="https://img.icons8.com/?&id=132&format=png&color=ffffff" alt=""></button>
            </form>
    `
    ul.appendChild(divBuscador);
    for(let i  = 1; i < menuItems.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `
                        <a href="${menuItems[i].url}">
                            <img src="${menuItems[i].img}" alt="">
                            ${menuItems[i].name}
                        </a>
                        `;
        ul.appendChild(li);
    }
}

/*Agregar un boton para ir para atras */