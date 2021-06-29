import express from 'express';
const router = express.Router();
import {
  authUser,
  createShippingAddress,
  getOneUser,
  logout,
  me,
  signUser,
  updateShippingAddress,
  updateUser,
} from '../controllers/userController.js';
import {
  removeUser,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/auth.js';
// import cartRoutes from './cartRoutes';

// main
router.route('/').get(protect, isAdmin, getAllUsers).post(signUser);

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

router
  .route('/:id')
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserById)
  .delete(protect, isAdmin, removeUser);

export default router;
