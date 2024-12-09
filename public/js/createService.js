const form = document.getElementById('createServiceForm')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token');

    if (!token) {
        console.log('No estás autenticado. Por favor, inicia sesión.');
        return;
    }
    console.log('ubicacion',document.getElementById('ubicacion').value);

    const dataService = {
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        duracion_hora: parseInt(document.getElementById('duracion_hora').value),
        descripcion: document.getElementById('descripcion').value || '',
        categoria: document.getElementById('categoria').value,
        ubicacion: document.getElementById('ubicacion').value,
        ciudad: document.getElementById('ciudad').value,
        telefono: document.getElementById('telefono').value,
        dia_semana: document.getElementById('dia_semana').value,
        hora_inicio: document.getElementById('hora_inicio').value,
        hora_fin: document.getElementById('hora_fin').value,
    };

    try {
        const response = await fetch('/api/service/createService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dataService)
        });
    
        const result = await response.json();
    
        if (response.ok) {
            console.log('Respuesta del servidor:', result);
            
            // Verifica exactamente qué devuelve el servidor
            if (result.serviceId) {
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