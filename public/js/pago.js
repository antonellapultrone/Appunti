async function fetchReservaData(id) {
    let idreserv = 1;
    const response = await fetch(`/api/reserva/${id}`, {
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

    const reservaJson = await response.json(); // Asegúrate de usar await aquí
    return reservaJson;
}

const getReserva = document.addEventListener('DOMContentLoaded', async () => {
  
    try {
        const reservaData = await fetchReservaData(1);
        document.getElementById("pago_total").textContent = reservaData.pago_total;
        document.getElementById("fecha_reserva").textContent = reservaData.fecha_reserva;
        document.getElementById("hora_inicio").textContent = reservaData.hora_inicio;
    
    }catch{

    }
    });
