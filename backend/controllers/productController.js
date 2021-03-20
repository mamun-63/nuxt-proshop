import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

// async route
// to handle error instead of writting try catch everytime, using express-async-handler npm package

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}) // will return everything
  res.json(products)
})

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    // As we have made custom error handler, so we can through error now, by default it 500 if status not set
    res.status(404)
    throw new Error("Product not found")
  }
})

export { getProducts, getProductById }