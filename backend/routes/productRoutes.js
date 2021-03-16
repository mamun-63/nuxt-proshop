import express from "express"
const router = express.Router()
import Product from "../models/productModel.js"
import asyncHandler from 'express-async-handler'

// async route
// to handle error instead of writting try catch everytime, using express-async-handler npm package

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
router.get("/", asyncHandler (async (req, res) => {
  const products = await Product.find({}) // will return everything
  res.json(products)
}))

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public
router.get("/:id", asyncHandler (async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    res.json(product)
  } else {
    res.status(404).json({message: 'Product not found'})
  }
}))

export default router
