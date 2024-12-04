import * as reservaModel from '../models/reserva.model.js';

export const getAllReservas = async(req, res) => {
    try {
        const reserva = await reservaModel.getAllReservas();
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas: ' + error });
    }
};
export const getAllReservasByUserId = async (req, res) => {
    try {
        const reserva = await reservaModel.getAllReservasByUserId(req.params.id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reserva' + error });
    }
};

export const getReservaById = async (req, res) => {
    try {
        const reserva = await reservaModel.getReservaById(req.params.id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reserva' + error });
    }
};


export const createReserva = async (req, res) => {
    try {
        const newReservaId = await reservaModel.createReserva(req.body);
        res.status(201).json({ id: newReservaId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva' + error });
    }
};


export const updateReserva = async (req, res) => {
    try {
        await reservaModel.updateReserva(req.params.id, req.body);
        res.json({ message: 'Reserva actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reserva' + error });
    }
};

export const deleteReserva = async (req, res) => {
    try {
        await reservaModel.deleteReserva(req.params.id);
        res.json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reserva' + error });
    }
};