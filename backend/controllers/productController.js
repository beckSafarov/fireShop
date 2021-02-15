import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel'


//@desc   Fetch all products
//@route  /api/products
//@access public
// exports.getProducts = asyncHandler(async(req, res) => {
//         const products = await Product.find();
//         res.json(products);
// });