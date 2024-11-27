/*function test(exp, var_){
    const regex = new RegExp(exp);
    if(regex.test(var_)){
        return true;
    }
    return false;
}

function validateRegister() {
    const firstName = document.getElementById("firstName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const formMessage = document.getElementById("formMessage");

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    const apellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!test(nameRegex,firstName)){
        console.log("validado");
        formMessage.textContent = "Email débil.";
        formMessage.style.backgroundColor = "#ff5f5f";
    }

    /* // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        formMessage.textContent = "Las contraseñas no coinciden.";
        formMessage.style.backgroundColor = "#ff5f5f";
        return false;
    }

    if(false){
    // Mostrar mensaje de éxito
    formMessage.textContent = "¡Registro exitoso!";
    formMessage.style.backgroundColor = "green";
    return false;
    } // Evita el envío real del formulario 
}
 function validateLogin() {
    const email = document.getElementById("email").value;
    console.log(email);
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

const boton = document.getElementById("btn");
console.log(boton);

 boton.addEventListener('click', function(e) {
    e.preventDefault();
    history.back();
}) 
validateRegister();
validateLogin()*/
