import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';
import estudianteRouter from './routes/estudiante';
import idiomaRouter from './routes/idioma';
import controlDeIdiomaRouter from './routes/controldeidioma';

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/estudiantes', estudianteRouter);
app.use('/idiomas', idiomaRouter);
app.use('/controlDeIdiomas', controlDeIdiomaRouter);

const PORT = process.env.PORT || 3000; // Puerto en el que corre el servidor

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
