import express from 'express';
import * as UserController from '../controllers/user.controller.js';
import * as Validate from '../middlewares/validacion.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';
import path from 'path';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('get/:id', UserController.getUserId);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/validateRegister', Validate.validateRegisterUser, UserController.createUser);
router.post('/validateLogin', Validate.validateLoginUser, UserController.loginUser);

router.get('/session', UserController.getUserSessionData);
router.get('/protected', verifyToken, (req, res) => {
    res.send('¡Bienvenido! Usuario autenticado: ${req.user.name}');
});

export default router;