import express from 'express';
import * as serviceController from '../controllers/service.controller.js';
import { upload } from '../config/cloudinary.config.js';
import { requireAuth } from '../middlewares/session.middleware.js';

const router = express.Router();

router.get('/', serviceController.getAllService);
router.get('/id/:id', serviceController.getServiceById);
router.get('/search/:data',serviceController.getServiceByNombreCategoriaCiudad);
router.get('/category/:categoria',serviceController.getServiceByCategory);
router.post(
    '/createService',
    requireAuth,  // Primero autentica
    serviceController.createService  // Luego crea el servicio
);
//ediatar servicio
router.put('/:id', serviceController.updateService);
//eliminar servicio
router.delete('/:id', serviceController.deleteService);
//subir imagen
router.post('/upload', requireAuth, upload.array('images', 2), serviceController.updateImg);

export default router;
