import express from 'express';
import * as UserController from '../controllers/user.controller.js';
import * as Validate from '../middlewares/login.validacion.js';
import { requireAuth } from '../middlewares/session.middleware.js';

const router = express.Router();

// Rutas públicas
router.post('/validateLogin', Validate.validateLoginUser, UserController.loginUser);
router.post('/validateRegister', Validate.validateRegisterUser, UserController.createUser);

// Rutas protegidas
router.get('/session', requireAuth, UserController.getUserSessionData);
router.post('/logout', requireAuth, UserController.logoutUser);

// CRUD de usuarios
router.get('/', UserController.getAllUsers);
router.get('/get/:id', UserController.getUserId);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
