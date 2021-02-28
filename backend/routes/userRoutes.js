import express from 'express';
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
router.route('/me').get(protect, me);
router.route('/profile').get(protect, getOneUser).put(protect, updateUser);

export default router;
