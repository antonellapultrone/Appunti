import app from './apps.js';
import express from 'express';

const PORT = 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://appunti-ewc3.onrender.com`);
});