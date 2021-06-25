import express from 'express';
const router = express.Router();
import {
  addCartItem,
  addMany,
  flushCartItems,
  getAllCartItems,
  removeCartItem,
  updateItemQts,
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

router
  .route('/')
  .get(protect, getAllCartItems)
  .post(protect, addCartItem)
  .delete(protect, flushCartItems);

router.route('/many').post(protect, addMany).put(protect, updateItemQts);
router.route('/:id').delete(protect, removeCartItem);

export default router;
