import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {

    const authHeader = 
        req.headers['authorization'] || 
        req.headers['Authorization'] || 
        req.get('Authorization');

    if (!authHeader) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const tokenParts = authHeader.split(' ');
    const token = tokenParts.length > 1 ? tokenParts[1] : tokenParts[0];

    if (!token) {
        return res.status(403).json({ message: 'Token no válido' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verificando el token:', error.message);
        return res.status(403).json({ message: 'Token no válido o expirado' });
    }
};