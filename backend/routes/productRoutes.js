import express from 'express';
const router = express.Router();
import {
  getProductById,
  getProductPrices,
  getProducts,
} from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/prices').post(getProductPrices);

export default router;
