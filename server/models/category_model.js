const mongoose = require('mongoose')
require('dotenv').confing

const categoriesSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    lowecase: true,
    maxLength: 100,
    required: [true, 'You need a category name']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model('Category', categoriesSchema)
module.exports = { Category }