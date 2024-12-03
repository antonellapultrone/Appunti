import express from 'express';
import * as serviceController from '../controllers/service.controller.js';
const router = express.Router();

router.get('/', serviceController.getAllService);
router.get('/:id', serviceController.getServiceById);
router.post('/createService', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);


export default router;
