import bcrypt from "bcryptjs"
// its bcryptjs not bcrypt we installed, bcrypt package has some dependency so using more convenient bcryptjs

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("secret", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("secret", 10),
  },
  {
    name: "Jane doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("secret", 10),
  },
]

export default users
