import jwt from 'jsonwebtoken'

// id as payload to identify the user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })
}

export default generateToken