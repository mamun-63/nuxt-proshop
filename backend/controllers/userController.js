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
    console.log('user found in db')
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401) // unauthorized
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if(userExists) {
    res.status(400)
    throw new Error('User already exist')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // res.send('Success')
  const user = await User.findById(req.user._id)
  if(req.user) {
    res.send({
      _id: user.id,
      name: user.name, 
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save() // update

    res.send({
      _id: updatedUser.id,
      name: updatedUser.name, 
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

export { authUser, registerUser, getUserProfile, updateUserProfile }