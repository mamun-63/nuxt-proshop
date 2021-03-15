import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // some options, if not then you may get some warning
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline
    )
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1) // exit with error
  }
}

export default connectDB
