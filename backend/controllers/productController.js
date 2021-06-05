import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc  Fetch all products
//@route /api/products
//@desc  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//@desc  Fetch a single products
//@route /api/products/:id
//@desc  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) throw new Error(`Product not found`);

  res.status(200).json({ success: true, data: product });
});
