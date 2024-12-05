import pool from "../config/conection.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
};

export const getUserId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
};

export const createUser = async (data) => {
    const {nombre, apellido, email, fechaNacimiento, password, confirmPass} = data;
    //pasar a validator
    if (password !== confirmPass) {
        return res.status(400).send("Las contraseñas no coinciden.");
    }
    console.log(apellido);

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
        "INSERT INTO usuarios (nombre, apellido, mail, fecha_nacimiento, contrasenia) VALUES (?, ?, ?, ?, ?)",
        [nombre, apellido, email, fechaNacimiento, hashedPassword]
    );
    console.log("Usuario Registrado Correctamente");
    return result.insertId;
};

export const updateUser = async (id, data) => {
    const { nombre, apellido, email, password } = data;
    await pool.query('UPDATE usuarios SET nombre = ?, apellido = ?, mail = ?, contrasenia = ? WHERE ID = ?', [nombre,apellido, email,password, id]);
};

export const deleteUser = async (id) => {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
};