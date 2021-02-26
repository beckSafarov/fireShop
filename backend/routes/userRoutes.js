import express from 'express';
const router = express.Router();
import {
  authUser,
  getAllUsers,
  getOneUser,
  getUserProfile,
  removeUser,
  signUser,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

router.route('/').get(getAllUsers).post(signUser).delete(removeUser);
router.get('/user', getOneUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser);

export default router;
