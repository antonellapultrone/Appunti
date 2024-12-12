import { renderButtonsCarrusel, initCarrusel } from './carrusel.js';

// Función para obtener el ID del servicio de la URL
function getServiceIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Obtiene el valor del parámetro 'id'
}

// Función asíncrona para obtener los datos del servicio
async function fetchServiceData(id) {
    const response = await fetch(`/api/service/id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const serviceJson = await response.json(); // Asegúrate de usar await aquí
    return serviceJson;
}

// Uso de los datos una vez que se resuelvan
document.addEventListener('DOMContentLoaded', async () => {
    const serviceId = getServiceIdFromUrl(); // Obtiene el ID del servicio de la URL
    if (!serviceId) {
        console.error('No se proporcionó un ID de servicio en la URL.');
        return;
    }

    try {
        const serviceData = await fetchServiceData(serviceId); // Espera la resolución

        // Renderiza los datos en la página
        document.getElementById("imagen-servicio").src = serviceData.imagenes.length > 0 ? serviceData.imagenes[0].url : '';
        document.getElementById("nombre-servicio").textContent = serviceData.nombre;
        document.getElementById("precio-servicio").textContent = serviceData.precio;
        document.getElementById("descripcion-servicio").textContent = serviceData.descripcion;
        document.getElementById("ubicacion-servicio").textContent = serviceData.ubicacion || 'Ubicación no disponible';
        document.getElementById("horas-reserva").textContent = serviceData.duracion_hora;
        
        const precioServicio = serviceData.precio;
        const duracionServicio = serviceData.duracion_hora;


        // Acción de reservar
        const form = document.getElementById('detalle-info-form');
        
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            //obtener el id de usuario por sessionStorage- no funciona aun
            const token = sessionStorage.getItem('token');

            if (!token) {
                console.log('No estás autenticado. Por favor, inicia sesión.');
                window.location.href = 'http://localhost:3000/views/login.html';
                return;
            }

            const responseUser = await fetch('/api/user/session', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            const userData = await responseUser.json();
            const userId = userData.id;

            const dataReserva = {
                pago_total:  precioServicio,
                usuario_ID: userId,
                servicio_ID: serviceId, // Usa el ID del servicio
                estado: 'pendiente',
                fecha_reserva: document.getElementById('fecha_reserva').value,
                hora_inicio: document.getElementById('hora_inicio').value,
                duracion: duracionServicio
            };

            try {
                const response = await fetch('/api/reserva/createReserva', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(dataReserva)
                });

                const result = await response.json();

                if (response.ok) {
                    console.log('Respuesta del servidor:', result);
                    if (result.reservaId) {
                        sessionStorage.setItem('dataReserva', JSON.stringify(dataReserva));
                        window.location.href = '/views/pago.html';
                    } else {
                        console.error('La respuesta no contiene un ID de servicio');
                        document.getElementById('formMessage').innerText = 'Error: Respuesta inesperada del servidor';
                    }
                } else {
                    console.error('Error en la respuesta:', result);
                    document.getElementById('formMessage').innerText = result.message || 'Error al crear la reserva';
                }
            } catch (error) {
                console.error('Error completo:', error);
                document.getElementById('formMessage').innerText = 'Error al crear la reserva';
            }
        });
    } catch (error) {
        console.error('Error al obtener los datos del servicio:', error);
    }
    //===============RENDER MAPA===============
    try {
        const serviceData = await fetchServiceData(getServiceIdFromUrl()); // Espera la resolución
    
        // Renderiza los datos en la página
        document.getElementById("imagen-servicio").src = serviceData.imagenes.length > 0 ? serviceData.imagenes[0].url : '';
        document.getElementById("nombre-servicio").textContent = serviceData.nombre;
        document.getElementById("precio-servicio").textContent = serviceData.precio;
        document.getElementById("descripcion-servicio").textContent = serviceData.descripcion;
        document.getElementById("ubicacion-servicio").textContent = serviceData.ubicacion || 'Ubicación no disponible';
        document.getElementById("horas-reserva").textContent = serviceData.duracion_hora;
    
        // Obtener la ubicación
        const ubicacion = serviceData.ubicacion; // Asegúrate de que esto contenga la dirección correcta
        if (ubicacion) {
            // Inicializar el mapa
            const map = L.map('mapa-ubicacion').setView([0, 0], 13); // Coordenadas iniciales
    
            // Cargar el mapa de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);
    
            // Geocodificar la ubicación para obtener las coordenadas
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(ubicacion)}`);
            const data = await response.json();
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                map.setView([lat, lon], 13); // Centrar el mapa en la ubicación
    
                // Agregar un marcador
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(ubicacion)
                    .openPopup();
            } else {
                console.error('No se encontró la ubicación');
            }
        }
    
    } catch (error) {
        console.error('Error al obtener los datos del servicio:', error);
    }
});
// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    const rootBtn = document.getElementById("contenedor-img");
    renderButtonsCarrusel(rootBtn, 'detalle-imagen');
    initCarrusel('detalle-imagen');
});