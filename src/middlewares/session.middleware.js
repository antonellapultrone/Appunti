import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar si el token está cerca de expirar
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp - currentTime < 300) { // Si quedan menos de 5 minutos
            // Generar un nuevo token
            const newToken = jwt.sign(
                { 
                    id: decoded.id, 
                    email: decoded.email 
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
            
            // Puedes enviar el nuevo token en la respuesta si lo deseas
            res.set('New-Token', newToken);
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};