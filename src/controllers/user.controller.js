import * as UsuarioModel from '../models/user.model.js';
import pool from "../config/conection.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'

dotenv.config({ path: './credenciales.env' });

export const getAllUsers = async (req, res) => {
    try {
        const usuario = await UsuarioModel.getAllUsers();
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios: ' + error });
    }
};

export const getUserId = async (req, res) => {
    try {
        const usuario = await UsuarioModel.getUserId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el servicio' + error });
    }
};

export const createUser = async (req, res) => {
    try {
        await UsuarioModel.createUser(req.body);
        /* res.status(201).json({ id: newUsuarioId }); */
        res.redirect('/views/login.html');
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el servicio' + error });
    }
};

export const updateUser = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token
        const usuarioId = req.user.id;

        // Datos a actualizar
        const { nombre, apellido, direccion, telefono, fechaNacimiento } = req.body;

        // Preparar objeto de actualización (solo incluir campos que tienen valor)
        const updateData = {};
        if (nombre) updateData.nombre = nombre;
        if (apellido) updateData.apellido = apellido;
        if (direccion) updateData.direccion = direccion;
        if (telefono) updateData.telefono = telefono;
        if (fechaNacimiento) updateData.fecha_nacimiento = fechaNacimiento;

        // Llamar al modelo para actualizar
        await UsuarioModel.updateUser(usuarioId, updateData);

        res.json({ 
            message: 'Datos de usuario actualizados correctamente',
            updatedFields: Object.keys(updateData)
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ 
            message: 'Error al actualizar los datos del usuario', 
            error: error.message 
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token
        const usuarioId = req.user.id;

        // Llamar al modelo para eliminar
        await UsuarioModel.deleteUser(usuarioId);

        res.json({ 
            message: 'Cuenta eliminada correctamente',
            redirectUrl: '/views/login.html'
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ 
            message: 'Error al eliminar la cuenta', 
            error: error.message 
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE mail = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.contrasenia);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Incluye el ID en el token
        const token = jwt.sign(
            { 
                id: user.ID,
                email: user.mail, 
                nombre: user.nombre, 
                apellido: user.apellido,
                fechaNacimiento: user.fecha_nacimiento
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            token, 
            id: user.ID
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const logoutUser = (req, res) => {
    try {        
        // Limpiar la sesión del servidor si estás usando express-session
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error al destruir la sesión:', err);
                }
            });
        }
        // Responder con éxito
        res.json({ 
            message: 'Sesión cerrada correctamente',
            redirectUrl: '/views/login.html'
        });
    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({ 
            message: 'Error al cerrar sesión', 
            error: error.message 
        });
    }
};

// Controlador para obtener datos del usuario autenticado
export const getUserSessionData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE ID = ?', [req.user.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];
        const userData = {
            id: user.ID,
            nombre: user.nombre || '',
            apellido: user.apellido || '',
            email: user.mail || '',
            direccion: user.direccion || '',
            telefono: user.telefono || '',
            fechaNacimiento: user.fecha_nacimiento || null,
            foto: user.foto || '',
            emprendimiento: user.emprendimiento || false
        };
        
        res.json(userData);
    } catch (error) {
        console.error('Error interno del servidor:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};