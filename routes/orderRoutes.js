import express from 'express';
import { getOrder, createOrder, updateOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getOrder);
router.patch('/:id', updateOrder);

export default router;
