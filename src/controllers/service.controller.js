import * as servicioModel from '../models/service.model.js';

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
        const newServiceId = await servicioModel.createService(req.body);
        res.status(201).json({ message: "Servicio creado correctamente", id: newServiceId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el servicio: ' + error });
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
