import express from 'express';
import * as serviceController from '../controllers/service.controller.js';
import * as userController from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/session.middleware.js';

const router = express.Router();

router.get('/', serviceController.getAllService);
router.get('/:id', serviceController.getServiceById);
router.post('/createService', 
    requireAuth,  // Primero autentica
    (req, res, next) => {
        userController.getUserSessionData(req, res, next);
    },
    serviceController.createService
);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

export default router;
