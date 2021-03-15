import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import users from "./data/users.js"
import products from "./data/products.js"
import Product from "./models/productModel.js"
import User from "./models/userModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

// be careful with seeder script, because it will replace all your data in database
// its just for sample data seed purpose at the begining, not needed while you gonna use with real data

const importData = async () => {
  try {
    // destroying all the data if exists
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1) // exits with failure
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1) // exits with failure
  }
}

// node backend/seeder -d
// to run this script we have to place some condition

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
