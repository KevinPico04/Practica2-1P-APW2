import { Router } from 'express';
import { getEstudiantes, getEstudiante, createEstudiante, updateEstudiante, deleteEstudiante } from '../controllers/estudianteController';

const router = Router();

router.get('/', getEstudiantes);
router.get('/:id', getEstudiante);
router.post('/', createEstudiante);
router.put('/:id', updateEstudiante);
router.delete('/:id', deleteEstudiante);

export default router;
