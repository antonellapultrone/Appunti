import * as UsuarioModel from '../models/user.model.js';
import pool from "../config/conection.js";
//import session from 'express-session';
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
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE mail = ?", [email]);
        const user = rows[0];
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Validar la contraseña (asumiendo que está cifrada)
        const validPassword = bcrypt.compareSync(password, user.contrasenia);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Crear el token JWT
        const token = jwt.sign(
            {
                id: user.ID,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.mail,
                foto: user.foto,
                direccion: user.direccion,
                emprendimiento: user.emprendimiento,
            },
            process.env.SESSION_SECRET,
            { expiresIn: '1d' } // El token expira en 1 día
        );

        // Responder con el token
        res.json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

//ver esto para mostrar los datos de dal sesion en myaccount.html
export const getUserSessionData = (req, res) => {
    if (req.user) {
        res.json({
            id: req.user.id,
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            email: req.user.email,
            foto: req.user.foto,
            direccion: req.user.direccion,
            emprendimiento: req.user.emprendimiento,
        });
    } else {
        res.status(401).json({ message: 'No hay sesión activa.' });
    }
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