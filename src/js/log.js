function validateForm() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const formMessage = document.getElementById("formMessage");

    // Verificar que todos los campos estén llenos
    if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
        formMessage.textContent = "Por favor, completa todos los campos.";
        return false;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        formMessage.textContent = "Las contraseñas no coinciden.";
        return false;
    }

    // Mostrar mensaje de éxito
    formMessage.textContent = "¡Registro exitoso!";
    formMessage.style.color = "green";
    return false; // Evita el envío real del formulario
}