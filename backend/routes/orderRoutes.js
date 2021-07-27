import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrder,
  updateOrderDeliveryStatus,
} from '../controllers/orderController.js'
import { isAdmin, protect } from '../middleware/auth.js'

router.route('/').get(protect, isAdmin, getAllOrders)
router.route('/addorder').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router
  .route('/:id')
  .get(getOrder)
  .put(protect, isAdmin, updateOrderDeliveryStatus)

export default router
