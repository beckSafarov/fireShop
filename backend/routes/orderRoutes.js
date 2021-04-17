import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrder,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

router.route('/addorder').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(getOrder);

export default router;
