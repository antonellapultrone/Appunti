function validateRegister() {
    const firstName = document.getElementById("firstName").value;
    console.log(firstName);
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const formMessage = document.getElementById("formMessage");

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        formMessage.textContent = "Las contraseñas no coinciden.";
        formMessage.style.backgroundColor = "#ff5f5f";
        return false;
    }

    // Mostrar mensaje de éxito
    formMessage.textContent = "¡Registro exitoso!";
    formMessage.style.backgroundColor = "green";
    return false; // Evita el envío real del formulario
}
function validateLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const formMessage = document.getElementById("formMessage");

    if ((email !== 'dantelugo1505@gmail.com') || (password !== 'existe')) {
        formMessage.textContent = "Las credenciales no son correctas.";
        formMessage.style.backgroundColor = "#ff5f5f";
        return false;
    }

    // Mostrar mensaje de éxito
    formMessage.textContent = "Iniciando Sesion...";
    formMessage.style.backgroundColor = "green";
    return false; // Evita el envío real del formulario
}
validateForm();
validateLogin()