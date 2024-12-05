const form = document.getElementById('createServiceForm')

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token');

    if (!token) {
        console.log('No estás autenticado. Por favor, inicia sesión.');
        return;
    }
    
    const dataService = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        duracion_hora: document.getElementById('duracion_hora').value,
        descripcion: document.getElementById('descripcion').value,
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

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la respuesta:', errorData);
            return;
        }

        const result = await response.json();
        console.log('Servicio creado:', result);
        alert('Servicio creado correctamente');
    } catch (error) {
        console.error('Error completo:', error);
        alert('Error al crear el servicio');
    }
});