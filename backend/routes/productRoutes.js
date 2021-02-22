import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';
// import {getProducts} from '../controllers/productController'

//@desc  Fetch all products
//@route /api/products
//@desc  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

//@desc  Fetch a single products
//@route /api/products/:id
//@desc  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

//@desc  Get prices of multiple products by id
//@route POST /api/products/prices
//@desc  Public
router.post(
  '/prices',
  asyncHandler(async (req, res) => {
    if (!req.body.productIDs || req.body.productIDs.length === 0) {
      res.status(404);
      throw new Error('Invalid product ids sent');
    }
    const productIDs = req.body.productIDs;
    let product;
    let prices = [];

    productIDs.forEach(async (id, index) => {
      product = await Product.findById(id);
      if (!product) {
        product = 'not found';
      }

      prices.push(product.price);

      if (index + 1 === productIDs.length) {
        res.status(200).json({
          success: true,
          prices,
        });
      }
    }); //end of the loop
  })
);

export default router;
