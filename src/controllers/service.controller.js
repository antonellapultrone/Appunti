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

// service.controller.js
export const createService = async (req, res) => {
    try {
        console.log('Solicitud completa:', {
            body: req.body,
            user: req.user,
            headers: req.headers
        });

        const usuarioID = req.user?.id;

        if (!usuarioID) {
            console.error('Error: No se encontró el ID de usuario');
            return res.status(401).json({ 
                message: 'Usuario no autenticado', 
                details: 'No se pudo obtener el ID de usuario' 
            });
        }

        const { 
            nombre, 
            precio, 
            duracion_hora, 
            categoria,
            descripcion = '', 
            ubicacion = '',
            ciudad = '',
            telefono = '',
            dia_semana,
            hora_inicio,
            hora_fin
        } = req.body;

        // Validaciones más detalladas
        const camposFaltantes = [];
        if (!nombre) camposFaltantes.push('nombre');
        if (!precio) camposFaltantes.push('precio');
        if (!duracion_hora) camposFaltantes.push('duracion_hora');
        if (!categoria) camposFaltantes.push('categoria');
        if (!dia_semana) camposFaltantes.push('dia_semana');
        if (!hora_inicio) camposFaltantes.push('hora_inicio');
        if (!hora_fin) camposFaltantes.push('hora_fin');

        if (camposFaltantes.length > 0) {
            console.error('Campos faltantes:', camposFaltantes);
            return res.status(400).json({
                message: 'Faltan campos obligatorios',
                camposFaltantes
            });
        }

        const dataService = {
            nombre, 
            precio, 
            duracion_hora, 
            categoria,
            descripcion: descripcion || 'Sin descripción',
            ubicacion,
            ciudad,
            telefono,
            dia_semana,
            hora_inicio,
            hora_fin,
            estado: 'active',
            usuario_ID: usuarioID
        };

        console.log('Datos a insertar en la base de datos:', dataService);

        try {
            const newServiceId = await servicioModel.createService(dataService);
            
            console.log('Servicio creado con ID:', newServiceId);
            
            // Modificado para devolver específicamente el ID del servicio
            res.status(201).json({ 
                message: 'Servicio creado correctamente', 
                serviceId: newServiceId 
            });
        } catch (dbError) {
            console.error('Error en la base de datos:', dbError);
            res.status(500).json({ 
                message: 'Error al crear el servicio en la base de datos', 
                error: dbError.message 
            });
        }
    } catch (error) {
        console.error('Error completo en createService:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor', 
            error: error.message 
        });
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
