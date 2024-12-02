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
        res.status(201).json({ id: newUsuarioId });
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
        const { email } = req.body;

        // Recuperar información del usuario (agregado por la validación)
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE mail = ?", [email]);
        const user = rows[0];

        // Simulación: Enviar datos de autenticación al cliente
        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.mail,
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
    }
};