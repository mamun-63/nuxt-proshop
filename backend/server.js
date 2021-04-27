import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import notFound from './middleware/errorMiddleware.js'
import errorHandler from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) // body parser, that will allow us to accept json data in body / req.body

// Middleware is a function that has access over req,res life cycle
// after making a request, it will fire. check this.
// app.use((req, res, next) => {
//   console.log('Hey Middleware')
//   console.log(req.originalUrl)
//   next()
// })

// cors policy problem, so added it
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.get("/", (req, res) => {
  res.send("API is running..")
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)


// Cutom Error Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
