const mongoose = require('mongoose')
const projectSchema = require('../Schema/project.js')
const Project = mongoose.model('project', userSchema)
module.exports = Project
