export const menuData = [
    {
        name: "Home",
        img: "../assets/icon/mago-pesc-light.png",
        url:"/"
    },
    {
        name: "Promos",
        img: "https://img.icons8.com/?size=100&id=a99zM4y8YPut&format=png&color=ffffff",
        url:"../../views/notfound.html"
    },
    {
        name: "Categorias",
        img: "https://img.icons8.com/?size=100&id=Ah8SLaXAg94W&format=png&color=ffffff",
        url:"/#section-categorias"
    }
    // No se incluye "Crear Servicio" aquí
];

export function renderNav(root, menuItems) {
    let nav = document.createElement('nav');
    root.appendChild(nav);
    let ul = document.createElement('ul');
    nav.appendChild(ul);

    // Agregar elementos fijos del menú
    for(let i = 0; i < menuItems.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `
                        <a href="${menuItems[i].url}">
                            <img src="${menuItems[i].img}" alt="">
                            ${menuItems[i].name}
                        </a>
                        `;
        ul.appendChild(li);
    }

    // Verificar si el usuario está autenticado
    const token = sessionStorage.getItem('token');
    if (token) {
        // Solo agregar "Crear Servicio" si el usuario está autenticado
        let liCrearServicio = document.createElement('li');
        liCrearServicio.innerHTML = `
            <a href="../../views/createServicio.html">
                <img src="https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff" alt="">
                Crear Servicio
            </a>
        `;
        ul.appendChild(liCrearServicio);
    }

    let divBuscador = document.createElement('div')
    divBuscador.setAttribute('class', 'buscador');
    divBuscador.innerHTML = `
            <form action="/views/resultados-busqueda.html" method="get">
                <input id="bucador" name="query" type="text" placeholder="Busca reservas, servicios y mas...">
                <button><img src="https://img.icons8.com/?&id=132&format=png&color=ffffff" alt=""></button>
            </form>
    `;
    ul.appendChild(divBuscador);

    // Añadir elemento de inicio de sesión/mi cuenta dinámicamente
    let liAuth = document.createElement('li');
    if (token) {
        // Usuario autenticado
        liAuth.innerHTML = `
            <a id="miCuenta">
                <img src="https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=ffffff" alt="">
                Mi Cuenta
            </a>
            <div id="popup-session" class="popup-session">
                <div>
                    <div>
                        <img src="https://img.icons8.com/?size=100&id=t0sXJJOlHoXc&format=png&color=000000" alt="">
                        <a href="../../views/myaccount.html">Ver Cuenta</a>
                    </div>
                    <div>
                        <img src="https://img.icons8.com/?size=100&id=2445&format=png&color=000000" alt="">
                        <a id="logout" href="">Cerrar Sesión</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Usuario no autenticado
        liAuth.innerHTML = `
            <a href="../../views/login.html">
                <img src="https://img.icons8.com/?size=100&id=ABBSjQJK83zf&format=png&color=ffffff" alt="">
                Ingresar
            </a>
        `;
    }

    ul.appendChild(liAuth);
}
document.addEventListener('DOMContentLoaded', async () => {
    const miCuenta = document.getElementById("miCuenta");
    const popup = document.getElementById("popup-session");

    miCuenta.addEventListener('click', (event) => {
        miCuenta.classList.toggle("active-header");
        popup.classList.toggle("display-b");

        // Detenemos la propagación para que este evento no dispare el listener global en el documento
        event.stopPropagation();
    });

    document.addEventListener('click', (event) => {
        // Verifica si el clic NO ocurrió dentro de 'miCuenta' o 'popup'
        if (!miCuenta.contains(event.target) && !popup.contains(event.target)) {
            miCuenta.classList.remove("active-header");
            popup.classList.remove("display-b");
        }
    });

    const cerrarSesion = document.getElementById("logout");
    cerrarSesion.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const token = sessionStorage.getItem('token');
            
            const response = await fetch('/api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Agregar token para autenticación
                },
            });

            if (response.ok) {
                // Limpiar toda la información de sesión
                sessionStorage.clear();
                // Redirigir al login
                window.location.href = '/views/login.html';
            } else {
                const errorData = await response.json();
                console.error('Error al cerrar sesión:', errorData.message);
                // Opcional: mostrar mensaje de error al usuario
                alert(errorData.message || 'Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error de red al cerrar sesión:', error);
            alert('No se pudo cerrar sesión. Compruebe su conexión.');
        }
    });
});