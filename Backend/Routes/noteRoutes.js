import express from 'express';
import controller from '../Controllers/noteController.js';

const router = express.Router();

router.get('/', controller.all);
router.post('/create', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/category/:category', controller.filterByCategory);

export default router;
