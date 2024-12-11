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
        await UsuarioModel.updateUser(req.params.id, req.body);
        res.json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el servicio' + error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await UsuarioModel.deleteUser(req.params.id);
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el servicio' + error });
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
                id: user.ID,  // Asegúrate de usar el nombre correcto del campo ID en tu base de datos
                email: user.mail, 
                nombre: user.nombre, 
                apellido: user.apellido,
                fechaNacimiento: user.fecha_nacimiento
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
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