import * as servicioModel from '../models/service.model.js';
import { upload, uploadToCloudinary } from '../config/cloudinary.config.js';

export const getAllService = async (req, res) => {
    try {
        const servicio = await servicioModel.getAllService();
        res.json(servicio);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ 
            message: 'Error al obtener los servicios', 
            error: error.message 
        });
    }
};

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

export const getServiceByNombreCategoriaCiudad = async (req, res) => {
    try {
        const servicio = await servicioModel.getServiceByNombreCategoriaCiudad(req.params.data);
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
        const usuarioID = req.user?.id;

        if (!usuarioID) {
            return res.status(401).json({ 
                message: 'Usuario no autenticado'
            });
        }

        const dataService = {
            ...req.body,
            usuario_ID: usuarioID
        };

        // Validaciones adicionales de imágenes
        if (!dataService.imagenes || dataService.imagenes.length === 0) {
            return res.status(400).json({
                message: 'Debe subir al menos una imagen'
            });
        }

        if (dataService.imagenes.length > 2) {
            return res.status(400).json({
                message: 'No se pueden subir más de 2 imágenes por servicio'
            });
        }

        const newServiceId = await servicioModel.createService(dataService);
        
        res.status(201).json({ 
            message: 'Servicio creado correctamente', 
            serviceId: newServiceId 
        });
    } catch (error) {
        console.error('Error en createService:', error);
        res.status(500).json({ 
            message: 'Error al crear el servicio', 
            error: error.message 
        });
    }
};

export const updateImg = async (req, res) => {
    try {
        // Si no hay archivos, devuelve un error
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No se han subido imágenes' });
        }

        // Subir cada imagen a Cloudinary
        const uploadPromises = req.files.map(uploadToCloudinary);
        const uploadResults = await Promise.all(uploadPromises);

        const imageUrls = uploadResults.map(result => ({
            url: result.secure_url,
            public_id: result.public_id
        }));

        res.status(200).json({
            message: 'Imágenes subidas correctamente',
            images: imageUrls
        });
    } catch (error) {
        console.error('Error al subir imágenes:', error);
        res.status(500).json({ 
            message: 'Error al subir imágenes', 
            error: error.message 
        });
    }
}

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
