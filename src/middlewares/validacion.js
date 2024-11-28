import { body, validationResult } from 'express-validator';
import pool from '../config/conection.js';
import bcrypt from 'bcrypt';

export const validateRegisterUser = [
    body('firstName')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('lastName')
        .notEmpty()
        .withMessage('El apellido es obligatorio'),
    body('email')
        .isEmail()
        .withMessage('El email es inválido')
        .custom(async (email) => {
            // Verificar si el correo ya está registrado
            const [rows] = await pool.query("SELECT * FROM usuarios WHERE mail = ?", [email]);
            if (rows.length > 0) {
                throw new Error('El usuario ya está registrado.');
            }
        }),
    body('password')
        .isStrongPassword({ minLength: 8, minSymbols: 1 })
        .withMessage('La contraseña debe ser más segura (mínimo 8 caracteres, incluyendo un símbolo)'),
    body('confirmPass')
        .custom((confirmPass, { req }) => {
            if (confirmPass !== req.body.password) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }),
    // Middleware para manejar los errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateLoginUser = [
    // Validar que el correo sea un email válido
    body('email')
        .isEmail()
        .withMessage('Debe proporcionar un correo electrónico válido.')
        .custom(async (email) => {
            // Verificar si el usuario existe
            const [rows] = await pool.query("SELECT * FROM usuarios WHERE mail = ?", [email]);
            if (rows.length === 0) {
                throw new Error('Credenciales incorrectas.');
            }
            // Adjuntar el usuario a la solicitud para usarlo después
            const user = rows[0];
            return (body('user') === user); 
        }),
    // Validar que la contraseña no esté vacía
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .custom(async (password, { req }) => {
            // Verificar la contraseña solo si el email ya pasó la validación
            const [rows] = await pool.query("SELECT * FROM usuarios WHERE mail = ?", [req.body.email]);
            if (rows.length > 0) {
                const user = rows[0];
                const passwordMatch = await bcrypt.compare(password, user.contrasenia);
                if (!passwordMatch) {
                    throw new Error('Credenciales incorrectas.');
                }
            }
        }),
    // Middleware para manejar los errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];