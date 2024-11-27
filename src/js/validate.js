import {pool} from "./conection.js"
import bcrypt from 'bcrypt';
import validator from 'validator'

// Método para validar y registrar usuarios
export async function validarRegister(req, res) {
    const { firstName: name, lastName: apellido, email: email, password: password, confirmPass: confirmPass } = req.body;

    // Validar entradas
    if (!validator.isEmail(email)) {
        return res.status(400).send("El email es inválido.");
    }
    if (!validator.isLength(name, { min: 2, max: 50 })) {
        return res.status(400).send("El nombre debe tener entre 2 y 50 caracteres.");
    }
    if (password !== confirmPass) {
        return res.status(400).send("Las contraseñas no coinciden.");
    }
    if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
        return res.status(400).send("La contraseña debe ser más segura (mínimo 8 caracteres, incluyendo un símbolo).");
    }

    try {
        // Verificar si el usuario ya existe
        const [rows] = await pool.query("SELECT * FROM usuario_cliente WHERE mail = ?", [email]);
        if (rows.length > 0) {
            return res.status(400).send("El usuario ya está registrado.");
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario
        await pool.query(
            "INSERT INTO usuario_cliente (nombre, apellido, mail, contrasenia) VALUES (?, ?, ?, ?)",
            [name, apellido, email, hashedPassword]
        );

        console.log("Usuario registrado correctamente.");
        return res.redirect("/"); // Redirige al inicio
    } catch (err) {
        console.error("Error al registrar usuario:", err);
        return res.status(500).send("Ocurrió un error en el servidor.");
    }
}

export async function validarLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const [rows] = await pool.query("SELECT * FROM usuario_cliente WHERE mail = ?", [email]);

        if (rows.length === 0) {
            // Usuario no encontrado
            return res.status(400).send("Credenciales incorrectas.");
        }

        const user = rows[0];
        
        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.contrasenia);
        if (!passwordMatch) {
            return res.status(400).send("Credenciales incorrectas.");
        }

        // Usuario autenticado
        console.log("Inicio de sesión exitoso para el usuario:", user.nombre);
        return res.redirect("/"); // Redirige al inicio
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        return res.status(500).send("Ocurrió un error en el servidor.");
    }
}
