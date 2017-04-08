const mongoose = require('mongoose')
const user = new mongoose.Schema({
  name: String,
  email: String,
  pass: String
})

module.exports = user
