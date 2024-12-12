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
    // Construir la consulta dinámicamente basada en los campos proporcionados
    const fields = [];
    const values = [];

    if (data.nombre) {
        fields.push('nombre = ?');
        values.push(data.nombre);
    }
    if (data.apellido) {
        fields.push('apellido = ?');
        values.push(data.apellido);
    }
    if (data.direccion) {
        fields.push('direccion = ?');
        values.push(data.direccion);
    }
    if (data.telefono) {
        fields.push('telefono = ?');
        values.push(data.telefono);
    }
    if (data.fecha_nacimiento) {
        fields.push('fecha_nacimiento = ?');
        values.push(data.fecha_nacimiento);
    }

    // Agregar el ID al final de los valores
    values.push(id);

    // Construir la consulta completa
    const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE ID = ?`;

    try {
        await pool.query(query, values);
    } catch (error) {
        console.error('Error en updateUser:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        // Primero, eliminar registros relacionados en otras tablas
        await pool.query('DELETE FROM reservas WHERE usuario_ID = ?', [id]);
        await pool.query('DELETE FROM servicios WHERE usuario_ID = ?', [id]);
        
        // Luego, eliminar el usuario
        await pool.query('DELETE FROM usuarios WHERE ID = ?', [id]);
    } catch (error) {
        console.error('Error en deleteUser:', error);
        throw error;
    }
};