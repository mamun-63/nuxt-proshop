import express from "express"
import products from "./data/products.js"
import connectDB from './config/db.js'
import dotenv from "dotenv"

dotenv.config()

connectDB()

const app = express()

// cors policy problem, so added it
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.get("/", (req, res) => {
  res.send("API is running..")
})

app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
