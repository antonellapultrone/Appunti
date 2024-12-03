import { body, validationResult} from 'express-validator';
import pool from '../config/conection.js';

export const validateReserva =[

    body('fecha_reserva')
        .notEmpty()
        .withMessage('La fecha es obligatoria'),
    body('hora_inicio')
        .isTime
        .withMessage('La hora de inicio es obligatoria'),
    body('hora_fin')
        .isTime
        .withMessage('La hora de finalización es obligatoria'),
    body('usuario_ID')
        .notEmpty()
        .withMessage('El usuario es obligatoria'),
    body('sevicio_ID')
        .notEmpty()
        .withMessage('El servicio es obligatoria'),
    // Middleware para manejar los errores
    (req, res, next) => {
        const errors = validationReserva(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]