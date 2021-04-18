import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import bcrypt from 'bcryptjs';
import { sendToken } from '../utils/sendToken.js';

//@desc  add a cart item
//@route POST /api/user/cartitems
//@desc  Private, need authorization
export const addCartItem = asyncHandler(async (req, res) => {
  const { _id, name, image, price, qty } = req.body;
  if (!_id || !name || !image || !price || !qty) {
    res.status(404);
    throw new Error(`Insufficient data`);
  }

  const product = Product.findById(_id);
  if (!product) {
    res.status(404);
    throw new Error(`No order was found with the id of ${_id}`);
  }

  const user = await User.findById(req.user.id);
  let message = `You added ${qty} ${name}(s) to your shopping cart`;
  if (user.cartItems.find((current) => current._id === _id)) {
    user.incrementCartItemQty(_id, qty);
    user.save();
    message = `You added ${qty} more ${name} to your shopping cart`;
  } else {
    user.addCartItem(req.body);
    user.save();
  }

  res.status(200).json({
    success: true,
    message,
    cartItems: user.cartItems,
  });
});

//@desc  add a cart item
//@route PUT /api/user/cartitems
//@desc  Private, need authorization
export const updateCartItemQty = asyncHandler(async (req, res) => {
  const { _id, qty } = req.body;
  if (!_id || !qty) {
    res.status(404);
    throw new Error(`Insufficient data`);
  }

  const userList = await User.find({ 'cartItems._id': _id });
  const user = userList.pop();
  if (!user) {
    res.status(404);
    throw new Error(
      `Invalid order id. Seems like you do not have such product in your cart`
    );
  }

  const updatedCartItems = await user.updateCartItemQty(_id, qty);
  user.save();
  res.status(200).json({
    success: true,
    cartItems: updatedCartItems,
  });
});

//@desc  get all items from cart
//@route GET /api/user/cartitems
//@desc  Private, need authorization
export const getAllCartItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    cartItems: user.cartItems,
  });
});

//@desc  remove an item from cart
//@route DELETE /api/user/cartitems/:id
//@desc  Private, need authorization
export const removeCartItem = asyncHandler(async (req, res) => {
  const response = await User.find({
    _id: req.user.id,
    'cartItems._id': req.params.id,
  });

  const user = response[0];
  if (!user) {
    res.status(400);
    throw new Error(`Seems like invalid id`);
  }

  user.removeCartItem(req.params.id);
  await user.save();

  res.status(200).json({
    success: true,
    message: `You have deleted the cart item with the id of ${req.params.id}`,
    cartItems: user.cartItems,
  });
});
