import pool from "../config/conection.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
};

export const getUserId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    
    // Devolver un objeto con valores por defecto si no existe
    if (rows.length === 0) return null;
    
    return {
        id: rows[0].ID,
        nombre: rows[0].nombre || '',
        apellido: rows[0].apellido || '',
        mail: rows[0].mail || '',
        direccion: rows[0].direccion || '',
        telefono: rows[0].telefono || '',
        fecha_nacimiento: rows[0].fecha_nacimiento || null,
        foto: rows[0].foto || '',
        emprendimiento: rows[0].emprendimiento || false
    };
};

export const createUser = async (data) => {
    const {
        nombre, 
        apellido, 
        email, 
        fechaNacimiento, 
        password, 
        confirmPass, 
        direccion = '', 
        telefono = '',
        emprendimiento = false
    } = data;

    // Validaciones previas
    if (password !== confirmPass) {
        throw new Error("Las contraseñas no coinciden");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
        "INSERT INTO usuarios (nombre, apellido, mail, fecha_nacimiento, contrasenia, direccion, telefono, emprendimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre, apellido, email, fechaNacimiento, hashedPassword, direccion, telefono, emprendimiento]
    );

    return result.insertId;
};

export const updateUser = async (id, data) => {
    const { nombre, apellido, email, password } = data;
    await pool.query('UPDATE usuarios SET nombre = ?, apellido = ?, mail = ?, contrasenia = ? WHERE ID = ?', [nombre,apellido, email,password, id]);
};

export const deleteUser = async (id) => {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
};