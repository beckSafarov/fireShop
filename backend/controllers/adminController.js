import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//@desc  Get all current users
//@route GET /api/admin/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc  Get one user
//@route GET /api/users/:id
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404);
    throw new Error('No user found with such id');
  }
});

//@desc  Update one user
//@route PUT /api/admin/users/:id
export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    res.status(404);
    throw new Error('No such user found!');
  }
  res.status(200).json({ user });
});

//@desc  delete a user
//@route DELETE /api/admin/users/:id
export const removeUser = asyncHandler(async (req, res) => {
  throw new Error('Sample Error');
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    res.status(404);
    throw new Error('No such user found');
  }

  res.status(200).json({
    success: true,
    message: `${deletedUser.name} has been deleted`,
  });
});
