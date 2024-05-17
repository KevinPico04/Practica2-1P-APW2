import { Request, Response } from 'express';
import { PrismaClient, Estado } from '@prisma/client';

const prisma = new PrismaClient();

export const getControlDeIdiomas = async (req: Request, res: Response) => {
  try {
    const controlDeIdiomas = await prisma.controlDeIdioma.findMany({
      where: { estado: Estado.ACTIVO },
      include: {
        estudiante: true,
        idioma: true,
      },
    });
    res.json(controlDeIdiomas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los controles de idioma' });
  }
};

export const getControlDeIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const controlDeIdioma = await prisma.controlDeIdioma.findUnique({
      where: { id: Number(id) },
      include: {
        estudiante: true,
        idioma: true,
      },
    });

    if (!controlDeIdioma) {
      return res.status(404).json({
        message: 'Control de idioma no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    res.json(controlDeIdioma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el control de idioma' });
  }
};

export const createControlDeIdioma = async (req: Request, res: Response) => {
  const { estudianteId, idiomaId, porcentajeLectura, porcentajeEscritura, porcentajeEscuchar_hablar } = req.body;
  try {
    const nuevoControlDeIdioma = await prisma.controlDeIdioma.create({
      data: {
        estudianteId,
        idiomaId,
        porcentajeLectura,
        porcentajeEscritura,
        porcentajeEscuchar_hablar,
        estado: Estado.ACTIVO,
      },
    });
    res.json(nuevoControlDeIdioma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el control de idioma' });
  }
};

export const updateControlDeIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { porcentajeLectura, porcentajeEscritura, porcentajeEscuchar_hablar } = req.body;
  try {
    const controlDeIdiomaExistente = await prisma.controlDeIdioma.findUnique({
      where: { id: Number(id) },
      include: {
        estudiante: true,
        idioma: true,
      },
    });

    if (!controlDeIdiomaExistente) {
      return res.status(404).json({
        message: 'Control de idioma no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    const controlDeIdiomaActualizado = await prisma.controlDeIdioma.update({
      where: { id: Number(id) },
      data: {
        porcentajeLectura,
        porcentajeEscritura,
        porcentajeEscuchar_hablar,
      },
    });

    res.json(controlDeIdiomaActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el control de idioma' });
  }
};

export const deleteControlDeIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const controlDeIdiomaExistente = await prisma.controlDeIdioma.findUnique({
      where: { id: Number(id) },
      include: {
        estudiante: true,
        idioma: true,
      },
    });

    if (!controlDeIdiomaExistente) {
      return res.status(404).json({
        message: 'Control de idioma no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    const controlDeIdiomaActualizado = await prisma.controlDeIdioma.update({
      where: { id: Number(id) },
      data: { estado: Estado.ELIMINADO },
    });

    res.json({ message: 'Control de idioma marcado como eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al marcar como eliminado el control de idioma' });
  }
};
