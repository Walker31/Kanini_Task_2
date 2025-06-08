import express from 'express';
import controller from '../Controllers/contactController.js';

const router = express.Router();

router.get('/', controller.all);
router.post('/create', controller.create);
router.get('/:name', controller.find);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
