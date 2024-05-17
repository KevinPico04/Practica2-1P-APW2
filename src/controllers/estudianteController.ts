import { Request, Response } from 'express';
import { PrismaClient, Estado } from '@prisma/client';

const prisma = new PrismaClient();

export const getEstudiantes = async (req: Request, res: Response) => {
  try {
    const estudiantes = await prisma.estudiante.findMany({
      where: { estado: Estado.ACTIVO },
    });
    res.json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
};

export const getEstudiante = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const estudiante = await prisma.estudiante.findUnique({
      where: { id: Number(id) },
    });

    if (!estudiante) {
      return res.status(404).json({
        message: 'Estudiante no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    res.json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
};

export const createEstudiante = async (req: Request, res: Response) => {
  const { nombre, identificacion } = req.body;
  try {
    const nuevoEstudiante = await prisma.estudiante.create({
      data: {
        nombre,
        identificacion,
        estado: Estado.ACTIVO,
      },
    });
    res.json(nuevoEstudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
};

export const updateEstudiante = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, identificacion } = req.body;
  try {
    const estudianteExistente = await prisma.estudiante.findUnique({
      where: { id: Number(id) },
    });

    if (!estudianteExistente) {
      return res.status(404).json({
        message: 'Estudiante no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    const estudianteActualizado = await prisma.estudiante.update({
      where: { id: Number(id) },
      data: { nombre, identificacion },
    });

    res.json(estudianteActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
};

export const deleteEstudiante = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const estudianteExistente = await prisma.estudiante.findUnique({
      where: { id: Number(id) },
    });

    if (!estudianteExistente) {
      return res.status(404).json({
        message: 'Estudiante no encontrado',
        estado: Estado.PENDIENTE,
      });
    }

    const estudianteActualizado = await prisma.estudiante.update({
      where: { id: Number(id) },
      data: { estado: Estado.ELIMINADO },
    });

    res.json({ message: 'Estudiante marcado como eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al marcar como eliminado el estudiante' });
  }
};
