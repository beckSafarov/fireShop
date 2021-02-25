import express from 'express';
const router = express.Router();
import {
  authUser,
  getAllUsers,
  removeUser,
  signUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

router.route('/').get(getAllUsers).post(signUser).delete(removeUser);
router.route('/login').post(authUser);

export default router;
