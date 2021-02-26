import express from 'express';
const router = express.Router();
import {
  authUser,
  getAllUsers,
  getCurrentUser,
  getOneUser,
  removeUser,
  signUser,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

router.route('/').get(getAllUsers).post(signUser).delete(removeUser);
router.route('/login').post(authUser);
router.get('/current', protect, getCurrentUser);
router.route('/:id').get(getOneUser).put(updateUser);

export default router;
