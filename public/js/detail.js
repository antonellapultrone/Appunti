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
        document.getElementById("imagen-servicio").src = serviceData.imagenes[0] || ''; // Usa la primera imagen si existe
        document.getElementById("nombre-servicio").textContent = serviceData.nombre;
        document.getElementById("precio-servicio").textContent = serviceData.precio;
        document.getElementById("descripcion-servicio").textContent = serviceData.descripcion;
        document.getElementById("ubicacion-servicio").textContent = serviceData.ubicacion || 'Ubicación no disponible';

        // Agrega el evento para la selección de horas
        const horasSelect = document.getElementById("horas-reserva");
        const precioSpan = document.getElementById("precio-servicio");
        horasSelect.addEventListener("change", () => {
            const horas = parseInt(horasSelect.value);
            const precioTotal = serviceData.precio * horas;
            precioSpan.textContent = `${precioTotal}`;
        });

        // Acción de reservar
        const form = document.getElementById('detalle-info');
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario
            //alert(`Reserva confirmada para ${serviceData.nombre}`);
            const token = sessionStorage.getItem('token');

            if (!token) {
                console.log('No estás autenticado. Por favor, inicia sesión.');
                window.location.href = 'http://localhost:3000/views/login.html';
                return;
            }

            const dataReserva = {
                precio_total: serviceData.precio * parseInt(horasSelect.value), // Calcula el precio total
                usuario_ID: document.getElementById('usuario_ID').value,
                servicio_ID: serviceId, // Usa el ID del servicio
                estado: document.getElementById('estado').value,
                fecha_reserva: document.getElementById('fecha_reserva').value,
                hora_inicio: document.getElementById('hora_inicio').value,
                hora_fin: document.getElementById('hora_fin').value,
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
                        window.location.href = '/';
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
});

// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    const rootBtn = document.getElementById("contenedor-img");
    renderButtonsCarrusel(rootBtn, 'detalle-imagen');
    initCarrusel('detalle-imagen');
});