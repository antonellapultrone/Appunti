import * as servicioModel from '../models/service.model.js';
import pool from '../config/conection.js'

export const getAllService = async (req,res) =>{
    try{
        const servicio = await servicioModel.getAllService();
        res.json(servicio);
    } catch(error){
        res.status(500).json({ message: 'Error al obtener los servicios: ' + error});
    }
}

export const getServiceById = async (req, res) => {
    try {
        const servicio = await servicioModel.getServiceById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el servicio' + error });
    }
};

export const createService = async (req, res) => {
    try {
        // Busca el ID del usuario en la base de datos usando el email
        const [userRows] = await pool.query(
            'SELECT ID FROM usuarios WHERE mail = ?', 
            [req.user.email]
        );

        if (userRows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const usuarioID = userRows[0].ID;

        // Validar campos requeridos
        const { 
            nombre, 
            precio, 
            duracion_hora, 
            categoria 
        } = req.body;

        if (!nombre || !precio || !duracion_hora || !categoria) {
            return res.status(400).json({ 
                message: 'Faltan campos obligatorios', 
                camposFaltantes: {
                    nombre: !nombre,
                    precio: !precio,
                    duracion_hora: !duracion_hora,
                    categoria: !categoria
                }
            });
        }

        const dataService = {
            ...req.body,
            usuario_ID: usuarioID
        };

        const newServiceId = await servicioModel.createService(dataService);
        res.status(201).json({ message: "Servicio creado correctamente", id: newServiceId });
    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({ message: 'Error al crear el servicio: ' + error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        await servicioModel.updateService(req.params.id, req.body);
        res.status(200).json({ message: "Servicio actualizado correctamente" }); 
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el servicio: ' + error });
    }
};

export const deleteService = async (req, res) => {
    try {
        await servicioModel.deleteService(req.params.id);
        res.status(204).json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el servicio' + error });
    }
};
