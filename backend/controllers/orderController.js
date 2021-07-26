import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc  Create new order
//@route post /api/orders/addorder
//@desc  Private, need authorization
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt,
  } = req.body

  if (req.user.cartItems.length === 0 || !paymentResult || !paymentMethod) {
    res.status(400)
    throw new Error('Insufficient data')
  }

  const order = new Order({
    orderItems: req.user.cartItems,
    user: req.user._id,
    shippingAddress: req.user.shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: true,
    paidAt,
  })

  // removing the purchased item from the cart of the user
  req.user.cartItems = []
  await req.user.save()

  const createdOrder = await order.save()

  res.status(200).json({ createdOrder })
})

//@desc  Get order
//@route GET /api/orders/:id
//@desc  Public
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!order) {
    res.status(404)
    throw new Error('Order not found with the provided id')
  }

  res.status(200).json({ order })
})

//@desc  Get all orders for admin
//@route GET /api/orders
//@desc  Private && Admin only
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(200).json({ orders })
})

//@desc  Get all orders for a user
//@route GET /api/orders/myorders
//@desc  Private, need authorization
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json({ orders })
})
