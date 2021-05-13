import express from "express"
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route("/login").post(authUser)
// protect middleware will run when hits this route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router