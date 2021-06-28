import express from 'express';
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

router.route('/:id').delete(protect, isAdmin, removeUser);

export default router;
