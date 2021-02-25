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
//@route POST /api/users
//@desc  Public
export const signUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw new Error('Insufficient details');

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error('User already exists');
  }

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

  if (!user || !(await bcrypt.compareSync(password, user.password))) {
    res.status(401);
    throw new Error(`Invalid credentials`);
  }

  user.password = undefined;
  user.isAdmin = undefined;
  sendToken(user.id, res, user);
});

//@desc  delete a user
//@route DELETE /api/users
//@desc  Private
export const removeUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  if (!id) {
    res.status(401);
    throw new Error(`User id not provided`);
  }
  const userExists = await User.findById(id);
  if (!userExists) {
    res.status(404);
    throw new Error('No such user found');
  }
  const name = userExists.name;
  await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: `${name} has been deleted`,
  });
});
