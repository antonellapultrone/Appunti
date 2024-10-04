const body = document.querySelector('body');

function renderNav(){
    let arrayString = ['', 'Promos', 'Categorias', 'Mis Reservas', 'Iniciar Sesion'];
    let arraysImg = ['../assets/img/mago-pesc (2).svg','https://img.icons8.com/?size=100&id=a99zM4y8YPut&format=png&color=ffffff', 'https://img.icons8.com/?size=100&id=Ah8SLaXAg94W&format=png&color=ffffff', 'https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff', 'https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=ffffff']

    let header = document .createElement('header')
    let nav = document.createElement('nav');
    header.appendChild(nav);
    let ul = document.createElement('ul');
    nav.appendChild(ul);

    for(let i = 0; i < 5; i++){
        let li = document.createElement('li');
        li.innerHTML = `
                        <a href="">
                            <img src="${arraysImg[i]}" alt="">
                        ${arrayString[i]}</a>
                        `
        ul.appendChild(li);
    }
    body.appendChild(header);
};
renderNav();

