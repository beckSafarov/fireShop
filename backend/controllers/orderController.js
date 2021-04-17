import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc  Create new order
//@route post /api/orders/addorder
//@desc  Private, need authorization
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt,
  } = req.body;

  if ((orderItems && orderItems.length === 0 && paymentResult) || !paidAt) {
    res.status(400);
    throw new Error('Insufficient data');
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: true,
    paidAt,
  });

  const createdOrder = await order.save();

  res.status(200).json({ createdOrder });
});

//@desc  Get order
//@route GET /api/orders/:id
//@desc  Private, need authorization
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found with the provided id');
  }

  res.status(200).json({ order });
});
