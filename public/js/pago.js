document.addEventListener('DOMContentLoaded', () => {
        const dataReserva = JSON.parse(sessionStorage.getItem('dataReserva'));

    const datosPagoDiv = document.getElementById('datos-pago');

    if (dataReserva) {
        // Crea un contenido HTML para mostrar los datos de la reserva
        const contenido = 
            `<p><strong>Fecha de reserva:</strong> ${dataReserva.fecha_reserva}</p>
            <p><strong>Hora de inicio:</strong> ${dataReserva.hora_inicio}</p>
            <p><strong>Duración:</strong> ${dataReserva.duracion} hora/s</p>
            <p><strong>Total a pagar:</strong> $ ${dataReserva.pago_total}</p>`;
        
        // Inserta el contenido en el div
        datosPagoDiv.innerHTML = contenido;
        sessionStorage.removeItem('dataReserva');
    } else {
        datosPagoDiv.innerHTML = '<p>No hay datos de reserva disponibles.</p>';
    }
});
