import express from 'express';
import * as UserController from '../controllers/user.controller.js';
import * as Validate from '../middlewares/validacion.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/validateRegister', Validate.validateRegisterUser, UserController.createUser);
router.post('/validateLogin', Validate.validateLoginUser, UserController.loginUser);

router.get('/session', UserController.getUserSessionData);

export default router;
