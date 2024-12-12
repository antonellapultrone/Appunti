document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('editUserForm');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const editConfirmPopup = document.getElementById('editConfirmPopup');
    const deleteConfirmPopup = document.getElementById('deleteConfirmPopup');
    const mensaje = document.getElementById('#mensaje');
    
    // Cargar datos del usuario al cargar la página
    async function loadUserData() {
        try {
            const token = sessionStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay sesión iniciada');
            }

            const response = await fetch('/api/user/session', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('No se pudieron cargar los datos del usuario');
            }
            const userData = await response.json();
            
            document.getElementById('nombre').value = userData.nombre || '';
            document.getElementById('apellido').value = userData.apellido || '';
            document.getElementById('direccion').value = userData.direccion || '';
            document.getElementById('telefono').value = userData.telefono || '';
            
            if (userData.fechaNacimiento) {
                const fecha = new Date(userData.fechaNacimiento);
                const fechaFormateada = fecha.toISOString().split('T')[0];
                document.getElementById('fechaNacimiento').value = fechaFormateada;
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
            alert('No se pudieron cargar los datos del usuario');
            window.location.href = '/views/login.html';
        }
    }
    loadUserData();

    function validateForm() {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;

        if (!nombre && !apellido && !direccion && !telefono && !fechaNacimiento) {
            alert('Debe modificar al menos un campo');
            return false;
        }
        return true;
    }

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            editConfirmPopup.style.display = 'flex';
            document.getElementById('overlay').style.display = 'block';
        }
    });

    document.getElementById('confirmEditBtn').addEventListener('click', async () => {
        try {
            const token = sessionStorage.getItem('token');
            
            const formData = {
                nombre: document.getElementById('nombre').value.trim(),
                apellido: document.getElementById('apellido').value.trim(),
                direccion: document.getElementById('direccion').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                fechaNacimiento: document.getElementById('fechaNacimiento').value
            };

            Object.keys(formData).forEach(key => {
                if (formData[key] === '') {
                    delete formData[key];
                }
            });

            if (Object.keys(formData).length === 0) {
                alert('No hay cambios para guardar');
                editConfirmPopup.style.display = 'none';
                return;
            }

            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'No se pudieron guardar los cambios');
            }
            editConfirmPopup.style.display = 'none';
            loadUserData();
            document.getElementById('overlay').style.display = 'none';

            mensaje.innerText= 'Cambios exitosos';
            mensaje.style.display= 'block';

            setTimeout(() => {
                mensaje.style.display= 'none';
            }, 1000);

        } catch (error) {
            console.error('Error al actualizar:', error);
            alert(error.message || 'No se pudieron guardar los cambios');
        }
    });

    document.getElementById('cancelEditBtn').addEventListener('click', () => {
        editConfirmPopup.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    deleteAccountBtn.addEventListener('click', () => {
        deleteConfirmPopup.style.display = 'flex';
        document.getElementById('overlay').style.display = 'block';
    });

    document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
        try {
            const token = sessionStorage.getItem('token');
            
            const response = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'No se pudo eliminar la cuenta');
            }

            sessionStorage.clear();
            window.location.href = '/views/login.html';

        } catch (error) {
            console.error('Error al eliminar cuenta:', error);
        }
    });

    document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
        deleteConfirmPopup.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editConfirmPopup) {
            editConfirmPopup.style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }
        if (event.target === deleteConfirmPopup) {
            deleteConfirmPopup.style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }
    });
});