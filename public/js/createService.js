export function previewImages() {
    const fileInput = document.getElementById('image');
    const previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = ''; // Limpiar vistas previas anteriores

    for (let file of fileInput.files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '200px';
            img.style.margin = '10px';
            previewContainer.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}

const form = document.getElementById('createServiceForm');
const imageInput = document.getElementById('image');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token');

    if (!token) {
        console.log('No estás autenticado. Por favor, inicia sesión.');
        return;
    }

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

    // Preparar imágenes
    // Subir imágenes a Cloudinary
    const imagenes = [];
    const files = imageInput.files;

    // Preparar FormData para la subida
    const formData = new FormData();
    for (let file of files) {
        formData.append('images', file);
    }

    try {
        const response = await fetch('/api/service/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
    
        const result = await response.json();
    
        console.log(result);
    
        if (response.ok) {
            // Guardar las URLs de las imágenes subidas
            result.images.forEach(image => {
                imagenes.push({
                    url: image.url,
                    descripcion: 'Imagen de servicio'
                });
            });
            dataService.imagenes = imagenes;
        } else {
            throw new Error(result.message || 'Error al subir imágenes');
        }
    } catch (error) {
        console.error('Error subiendo imagen:', error);
        document.getElementById('formMessage').innerText = 'Error al subir imágenes';
        return;
    }

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