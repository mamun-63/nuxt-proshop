const notFound = (req,res,next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) // thats how we through error
  res.status(404)
  next(error)
}

// this code will help to see the error in json format
// if we give get call of product by ultapalta id
const errorHandler = (err,req,res,next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack // just need this stack in development mode
  })
}

export default [notFound, errorHandler]