import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

router.route('/addorder').get(protect, addOrderItems);

export default router;
