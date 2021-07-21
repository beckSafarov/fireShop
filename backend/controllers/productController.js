import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc  Fetch all products
//@route GET /api/products
//@desc  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//@desc  Fetch a single products
//@route GET /api/products/:id
//@desc  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error(`Product not found!`);
  }

  res.status(200).json({ success: true, data: product });
});

//@desc  Add product
//@route POST /api/products
//@desc  Private/Admin
export const addProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'New Product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'No Brand',
    category: 'No Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Lorem ipsum dolor',
  });

  await product.save();
  res.status(201).json(product);
});

//@desc  Update product
//@route PUT /api/products/:id
//@desc  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    res.status(404);
    throw new Error('No such product found!');
  }
  res.status(200).json({ product });
});

//@desc  Delete product
//@route DELETE /api/products/:id
//@desc  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const delProduct = await Product.findByIdAndDelete(id);
  if (!delProduct) {
    res.status(404);
    throw new Error('No such product found');
  }

  res.status(200).json({
    success: true,
    message: `${delProduct.name} has been deleted`,
  });
});
