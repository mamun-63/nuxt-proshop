import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // added timestamps, so get createdAt and updatedAt automatically, can do it manually also
    timestamps: true,
  }
)

// for matching password 
// compare plain text and hash password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password) // this.password is coming from matchpassword
}

// before create/save a user module, run a pieace of middleware to encrypt password
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next() // if not modified password then move on, dont modify the password
  }

  const salt = await bcrypt.genSalt(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User
