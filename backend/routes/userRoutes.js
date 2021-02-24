import express from 'express';
const router = express.Router();
import {
  authUser,
  getAllUsers,
  signUser,
} from '../controllers/userController.js';

router.route('/').get(getAllUsers);
router.route('/login').get(authUser);
router.route('/signup').get(signUser);

export default router;
