import express from 'express';
import * as cardcontroller from '../controllers/card.controller.js';
const router = express.Router();

router.get('/api/cards', cardcontroller.getAllCards);

export default router;