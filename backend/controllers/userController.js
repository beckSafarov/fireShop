import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { sendToken } from '../utils/sendToken.js';

//@desc  Get all current users
//@route GET /api/users
//@desc  Public (for now)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc  Sign in
//@route POST /api/users/signup
//@desc  Public
export const signUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new Error('Insufficient details');

  req.body.password = bcrypt.hashSync(password, 10);

  const newUser = await User.create(req.body);
  sendToken(newUser.id, res, newUser);
});

//@desc  Auth user & get token
//@route POST /api/users/login
//@desc  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error(`Insufficient credentials`);

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error(`Invalid credentials`);
  }

  sendToken(user.id, res);
});
