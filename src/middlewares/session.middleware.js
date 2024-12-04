import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    

    if (!authHeader) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token no válido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adjuntar los datos del usuario al request
        next();
    } catch (error) {
        console.error('Error verificando el token:', error.message);
        return res.status(403).json({ message: 'Token no válido o expirado' });
    }
};
