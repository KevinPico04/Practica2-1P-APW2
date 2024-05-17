import { Router } from 'express';
import { getControlDeIdiomas, getControlDeIdioma, createControlDeIdioma, updateControlDeIdioma, deleteControlDeIdioma } from '../controllers/controlDeIdiomaController';

const router = Router();

router.get('/', getControlDeIdiomas);
router.get('/:id', getControlDeIdioma);
router.post('/', createControlDeIdioma);
router.put('/:id', updateControlDeIdioma);
router.delete('/:id', deleteControlDeIdioma);

export default router;
