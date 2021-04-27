import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  // console.log(req.headers.authorization)
  
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded)
      req.user = await User.findById(decoded.id).select('-password') // select except password

      next() // that means it will not go to the if(!token) portion as it resolves true
    }
  } catch (error) {
    console.error(error)
    res.status(401)
    throw new Error('Not Authorized, Token failed')
  }

  if(!token) {
    res.status(401)
    throw new Error('Not Authorized, No Token')
  }
})

export { protect }