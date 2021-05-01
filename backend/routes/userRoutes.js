import express from 'express';
import {
  addCartItem,
  getAllCartItems,
  removeCartItem,
  updateCartItemQty,
} from '../controllers/cartController.js';
const router = express.Router();
import {
  authUser,
  createShippingAddress,
  getAllUsers,
  getOneUser,
  logout,
  me,
  removeUser,
  signUser,
  updateShippingAddress,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

// main
router.route('/').get(getAllUsers).post(signUser).delete(protect, removeUser);

// user info related
router.route('/me').get(me);
router.route('/profile').get(protect, getOneUser).put(protect, updateUser);
router
  .route('/shippingaddress')
  .post(protect, createShippingAddress)
  .put(protect, updateShippingAddress);

//auth related
router.route('/login').post(authUser);
router.route('/logout').put(protect, logout);

// cart items related
router
  .route('/cartItems')
  .get(protect, getAllCartItems)
  .post(protect, addCartItem)
  .put(protect, updateCartItemQty);
router.route('/cartItems/:id').delete(protect, removeCartItem);

export default router;
