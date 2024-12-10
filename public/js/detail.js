import {renderButtonsCarrusel, initCarrusel} from './carrusel.js';
const id = 1;

//carousel
document.addEventListener('DOMContentLoaded', async () => {
    const rootImagen = document.getElementById("detalle-imagen");
    const rootBtn = document.getElementById("contenedor-img")
    renderButtonsCarrusel(rootBtn, 'detalle-imagen');
    initCarrusel('detalle-imagen');
});

// Función asíncrona para obtener los datos del servicio
async function fetchServiceData() {
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
    try {
        const serviceData = await fetchServiceData(); // Espera la resolución

        // Renderiza los datos en la página
        document.getElementById("imagen-servicio").src = serviceData.imagenes[0] || ''; // Usa la primera imagen si existe
        document.getElementById("nombre-servicio").textContent = serviceData.nombre;
        document.getElementById("precio-servicio").textContent = serviceData.precio;
        document.getElementById("descripcion-servicio").textContent = serviceData.descripcion;
        document.getElementById("ubicacion-servicio").textContent = serviceData.ubicacion || 'Ubicación no disponible';
    } catch (error) { 
        console.error('Error al obtener los datos del servicio:', error);
    }
});
    // Agrega evento para la selección de horas
    const horasSelect = document.getElementById("horas-reserva");
    const precioSpan = document.getElementById("precio-servicio");
    horasSelect.addEventListener("change", () => {
        const horas = parseInt(horasSelect.value);
        const precioTotal = serviceData.precio * horas;
        precioSpan.textContent = `${precioTotal}`;
    });


    // Acción de reservar
    const form = document.getElementById('detalle-info')

    form.addEventListener('submit', async (event) => {
        alert(`Reserva confirmada para ${serviceData.nombre}`);
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.log('No estás autenticado. Por favor, inicia sesión.');
            window.location.href = 'http://localhost:3000/views/login.html';
            return;
        }
        
        const dataReserva = {
            precio_total: precioTotal,
            usuario_ID: document.getElementById('usuario_ID').value,
            servicio_ID: document.getElementById('servicio_ID').value,
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
                
                // Verifica exactamente qué devuelve el servidor
                if (result.reservaId) {
                    window.location.href = '/';
                } else {
                    console.error('La respuesta no contiene un ID de servicio');
                    document.getElementById('formMessage').innerText = 'Error: Respuesta inesperada del servidor';
                }
            } else {
                console.error('Error en la respuesta:', result);
                document.getElementById('formMessage').innerText = result.message || 'Error al crear el servicio';
            }
        } catch (error) {
            console.error('Error completo:', error);
            document.getElementById('formMessage').innerText = 'Error al crear el servicio';
        }
    });




