import express from 'express';
const router = express.Router();
import { addOrderItems, getOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

router.route('/addorder').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrder);

export default router;
