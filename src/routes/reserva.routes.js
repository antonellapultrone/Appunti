import express from 'express';
import * as reservaController from '../controllers/reserva-controller.js';
const router = express.Router();

router.get('/', reservaController.getAllReservas);
router.get('/:id', reservaController.getReservaById);
router.get('/user/:id', reservaController.getAllReservasByUserId);
router.post('/createReserva', reservaController.createReserva);
router.put('/:id', reservaController.updateReserva);
router.delete('/:id', reservaController.deleteReserva);


export default router;