import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/usuario.routes.js';
import serviceRoutes from './routes/service.routes.js';
//import cardsRoutes from './routes/card.routes.js';
import reservaRoutes from './routes/reserva.routes.js';

const app = express();
dotenv.config({ path: './credenciales.env' });

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// Middleware para manejar sesiones
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Solo usa `secure` en producción (HTTPS)
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        },
    })
);
// Middleware
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);
app.use('/views', userRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/cards', serviceRoutes);
app.use('/api/reserva', reservaRoutes);

app.use('/api/upload', serviceRoutes);

export default app;