import * as UsuarioModel from '../models/user.model.js';
import pool from "../config/conection.js";

export const getAllUsers = async (req, res) => {
    try {
        const usuario = await UsuarioModel.getAllUsers();
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios: ' + error });
    }
};

export const getUserById = async (req, res) => {
    try {
        const usuario = await UsuarioModel.getUserById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el servicio' + error });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUsuarioId = await UsuarioModel.createUser(req.body);
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
        const { email} = req.body;
        // Recuperar información del usuario
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE mail = ?", [email]);
        const user = rows[0];

        // Almacenar datos del usuario en la sesión del servidor
        req.session.userId = user.ID;
        req.session.userName = user.nombre;
        req.session.userLastName = user.apellido;
        req.session.userEmail = user.mail;
        req.session.userPhoto = user.foto;
        req.session.userAddress = user.direccion;
        req.session.userEntrepreneur = user.emprendimiento;

        // Respuesta exitosa
        res.redirect('/views/myaccount.html');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
    }
};

//ver esto para mostrar los datos de dal sesion en myaccount.html
export const getUserSessionData = (req, res) => {
    // Recuperar datos del sessionStorage
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    const userLastName = sessionStorage.getItem('userLastName');
    const userEmail = sessionStorage.getItem('userEmail');
    const userPhoto = sessionStorage.getItem('userPhoto');
    const userAddress = sessionStorage.getItem('userAddress');
    const userEntrepreneur = sessionStorage.getItem('userEntrepreneur');

    if (userId) {
        res.json({
            id: userId,
            nombre: userName,
            apellido: userLastName,
            email: userEmail,
            foto: userPhoto,
            direccion: userAddress,
            emprendimiento: userEntrepreneur,
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