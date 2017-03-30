const mongoose = require('mongoose')
const project = new mongoose.Schema({
  name: String,
  email: String,
  developer: String,
  page: String
})

module.exports = project
