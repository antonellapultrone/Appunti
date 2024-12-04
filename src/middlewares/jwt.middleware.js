import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config({ path: './credenciales.env' });

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Espera "Bearer TOKEN"
    if (!token) return res.status(401).json({ message: 'Acceso denegado, token faltante' });

    try {
        const verified = jwt.verify(token, process.env.SESSION_SECRET); // Verifica el token con tu clave secreta
        req.user = verified; // Adjunta la información del usuario al objeto req
        next(); // Continúa al siguiente middleware/controlador
    } catch (err) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
