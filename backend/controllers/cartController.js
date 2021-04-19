import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import bcrypt from 'bcryptjs';
import { sendToken } from '../utils/sendToken.js';

//@desc  add a cart item
//@route POST /api/users/cartitems
//@desc  Private, need authorization
export const addCartItem = asyncHandler(async (req, res) => {
  const { _id, name, image, price, qty } = req.body;
  if (!_id || !name || !image || !price || !qty) {
    res.status(404);
    throw new Error(`Insufficient data`);
  }

  const product = await Product.findById(_id);
  if (!product) {
    res.status(404);
    throw new Error(`No order was found with the id of ${_id}`);
  } else if (product.countInStock < qty) {
    res.status(404);
    throw new Error(
      `Not enough products in stock. In stock: ${product.countInStock}, you require: ${qty}`
    );
  }

  const user = await User.findById(req.user.id);
  let message = `You added ${qty} ${name}(s) to your shopping cart`;
  if (user.cartItems.find((current) => current._id === _id)) {
    req.body.countInStock = product.countInStock;
    user.incrementCartItemQty(_id, qty);
    product.countInStock -= qty;
    await user.save();
    await product.save();
    message = `You added ${qty} more ${name} to your shopping cart`;
  } else {
    req.body.countInStock = product.countInStock;
    user.addCartItem(req.body);
    product.countInStock -= qty;
    await user.save();
    await product.save();
  }

  res.status(200).json({
    success: true,
    message,
    cartItems: user.cartItems,
  });
});

//@desc  add a cart item
//@route PUT /api/users/cartitems
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
  await user.save();
  res.status(200).json({
    success: true,
    cartItems: updatedCartItems,
  });
});

//@desc  get all items from cart
//@route GET /api/users/cartitems
//@desc  Private, need authorization
export const getAllCartItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    cartItems: user.cartItems,
  });
});

//@desc  remove an item from cart
//@route DELETE /api/users/cartitems/:id
//@desc  Private, need authorization
export const removeCartItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const response = await User.find({
    _id: req.user.id,
    'cartItems._id': itemId,
  });

  const user = response[0];
  if (!user) {
    res.status(400);
    throw new Error(`Seems like invalid id`);
  }

  // add the quantity of the deleting product to the countInStock of the item
  const product = await Product.findById(itemId);
  const productObj = user.cartItems.find((product) => product._id === itemId);
  product.countInStock += productObj.qty;
  await product.save();

  user.removeCartItem(itemId);
  await user.save();

  res.status(200).json({
    success: true,
    message: `You have deleted the cart item with the id of ${itemId}`,
    cartItems: user.cartItems,
  });
});
