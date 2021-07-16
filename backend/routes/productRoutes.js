import express from 'express';
const router = express.Router();
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/auth.js';

router.route('/').get(getProducts).post(protect, isAdmin, addProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
