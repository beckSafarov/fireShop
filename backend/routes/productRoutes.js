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

export default router;

// const id = req.params.id;
// let status = 404;
// let success = false;
// let message = `No product found with the id of ${id}`;
// let outProduct = [];

// outProduct = products.filter(product=>product._id===id);

// if(outProduct.length > 0){
//     status = 200;
//     success = true;
//     message = undefined;
// }

// res.status(status).json({
//     success: true,
//     message,
//     data: outProduct
// })
