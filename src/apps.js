import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import userRoutes from './routes/usuario.routes.js';
import serviceRoutes from './routes/service.routes.js';
import cardsRoutes from './routes/card.routes.js';
import reservaRoutes from './routes/reserva.routes.js';

const app = express();
dotenv.config({ path: './credenciales.env' });

// Middleware para manejar sesiones
/*app.use(session({
    secret: process.env.SESSION_SECRET, // Cambia esto por una cadena secreta
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));*/
// Middleware
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);
app.use('/api/service', serviceRoutes);
app.get('/api/cards', cardsRoutes);
app.use('/api/reserva', reservaRoutes);

export default app;