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

/* export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE mail = ?", [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.contrasenia);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { userId: user.id,email: user.mail }
            ,process.env.SESSION_SECRET,
            {expiresIn: '1h'});
        // Enviar el token y los datos del usuario (sin contraseñas)
        res.json({
            token,
            userData: {
                id: user.id,
                nombre: user.nombre,
                email: user.mail,
                direccion: user.direccion,
            },
        });
    } catch (error) {
        console.error('Error en loginUser:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
 */

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

        // Generar el token
        const token = jwt.sign(
            { id: user.id, email: user.mail, nombre: user.nombre, apellido: user.apellido
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


// Controlador para obtener datos del usuario autenticado
export const getUserSessionData = (req, res) => {
    const user = req.user; // Dato adjuntado por `requireAuth`
    if (!user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    res.json(user);
};



export const logoutUser  = (req, res) => {
    // Limpiar sessionStorage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userLastName');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userPhoto');
    sessionStorage.removeItem('userAddress');
    sessionStorage.removeItem('userEntrepreneur');

    res.json({ message: 'Usuario ha cerrado sesión.' });
};