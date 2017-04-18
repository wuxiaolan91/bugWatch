const mongoose = require('mongoose')
const userSchema = require('../Schema/user.js')
const User = mongoose.model('user', userSchema)
module.exports = User
