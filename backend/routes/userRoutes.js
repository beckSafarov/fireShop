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
  getAllUsers,
  getOneUser,
  logout,
  me,
  removeUser,
  signUser,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

router.route('/').get(getAllUsers).post(signUser).delete(removeUser);
router.route('/login').post(authUser);
router.route('/logout').put(logout);
router.route('/me').get(me);
router.route('/profile').get(protect, getOneUser).put(protect, updateUser);
router
  .route('/cartItems')
  .get(protect, getAllCartItems)
  .post(protect, addCartItem)
  .put(protect, updateCartItemQty);
router.route('/cartItems/:id').delete(protect, removeCartItem);

export default router;
