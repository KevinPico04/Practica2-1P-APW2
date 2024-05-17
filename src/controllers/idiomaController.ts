import { Request, Response } from 'express';
import { PrismaClient, Estado } from '@prisma/client';

const prisma = new PrismaClient();

export const getIdiomas = async (req: Request, res: Response) => {
  const idiomas = await prisma.idioma.findMany({
    where: { estado: Estado.ACTIVO },
  });
  res.json(idiomas);
};

export const getIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idioma = await prisma.idioma.findUnique({
    where: { id: Number(id) },
  });

  if (!idioma) {
    return res.status(404).json({
      message: 'Idioma no encontrado',
      estado: Estado.PENDIENTE,
    });
  }

  res.json(idioma);
};

export const createIdioma = async (req: Request, res: Response) => {
  const { descripcion } = req.body;
  try {
    const nuevoIdioma = await prisma.idioma.create({
      data: {
        descripcion,
        estado: Estado.ACTIVO,
      },
    });
    res.json(nuevoIdioma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el idioma' });
  }
};

export const updateIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  try {
    const idiomaExistente = await prisma.idioma.findUnique({
      where: { id: Number(id) },
    });

    if (!idiomaExistente) {
      return res.status(404).json({
        message: 'Idioma no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    const idiomaActualizado = await prisma.idioma.update({
      where: { id: Number(id) },
      data: { descripcion },
    });
    
    res.json(idiomaActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el idioma' });
  }
};

export const deleteIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const idiomaExistente = await prisma.idioma.findUnique({
      where: { id: Number(id) },
    });

    if (!idiomaExistente) {
      return res.status(404).json({
        message: 'Idioma no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    const idiomaActualizado = await prisma.idioma.update({
      where: { id: Number(id) },
      data: { estado: Estado.ELIMINADO },
    });

    res.json({ message: 'Idioma marcado como eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al marcar como eliminado el idioma' });
  }
};
