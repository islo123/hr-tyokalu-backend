const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const { email } = req.body
  const exists = await User.findOne({ email })
  if(exists) {
    return res.sendStatus(409)
  }
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { _id: user._id ,name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.sendStatus(400)
  }
  const user = await User.findOne({ email })
  if (!user) return res.sendStatus(401);
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return res.sendStatus(403)
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { _id: user._id, name: user.name }, token })
}

module.exports = {
  register,
  login,
}