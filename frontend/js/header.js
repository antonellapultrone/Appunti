export const menuData = [
    {
        name: "Home",
        img: "../assets/img/mago-pesc (2).svg"
    },
    {
        name: "Promos",
        img: "https://img.icons8.com/?size=100&id=a99zM4y8YPut&format=png&color=ffffff"
    },
    {
        name: "Categorias",
        "img": "https://img.icons8.com/?size=100&id=Ah8SLaXAg94W&format=png&color=ffffff"
    },
    {
        name: "Mis Reservas",
        img: "https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff"
    },
    {
        name: "Iniciar Sesion",
        img: "https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=ffffff"
    }
]
export function renderNav(root, menuItems) {
    let header = document.createElement('header');
    let nav = document.createElement('nav');
    header.appendChild(nav);
    let ul = document.createElement('ul');
    nav.appendChild(ul);

    for(let i  = 0; i < menuItems.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `
                        <a href="">
                            <img src="${menuItems[i].img}" alt="">
                            ${menuItems[i].name}
                        </a>
                        `;
        ul.appendChild(li);
    }
    root.appendChild(header);
}