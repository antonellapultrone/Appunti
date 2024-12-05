document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/user/validateLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                document.getElementById('formMessage').innerText = "Credenciales Incorrectas";
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    });
});