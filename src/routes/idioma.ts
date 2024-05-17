import { Router } from 'express';
import { getIdiomas, getIdioma, createIdioma, updateIdioma, deleteIdioma } from '../controllers/idiomaController';

const router = Router();

router.get('/', getIdiomas);
router.get('/:id', getIdioma);
router.post('/', createIdioma);
router.put('/:id', updateIdioma);
router.delete('/:id', deleteIdioma);

export default router;
