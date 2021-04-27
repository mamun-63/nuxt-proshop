import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // res.send({ email, password }) // just an example that we have access on email and user on body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401) // unauthorized
    throw new Error('Invalid email or password')
  }
})

export { authUser }