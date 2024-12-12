import express from 'express';
import * as serviceController from '../controllers/service.controller.js';
const router = express.Router();

router.get('/api/cards', serviceController.getAllService);


export default router;