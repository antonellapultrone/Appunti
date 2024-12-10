import express from 'express';
import * as serviceController from '../controllers/service.controller.js';
import * as userController from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/session.middleware.js';

const router = express.Router();

router.get('/', serviceController.getAllService);
router.get('/id/:id', serviceController.getServiceById);
router.get('/search/:data',serviceController.getServiceByNombreCategoriaCiudad);
router.post(
    '/createService',
    requireAuth,  // Primero autentica
    serviceController.createService  // Luego crea el servicio
);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

export default router;
