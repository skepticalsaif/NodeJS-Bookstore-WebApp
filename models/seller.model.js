const mongoose = require('mongoose')

var sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required'
  },
  author: {
    type: String,
    required: 'This field is required'
  },
  price: {
    type: Number,
    required: 'This field is required'
  },
  sold: {
    type: Boolean,
    default: false
  }
})

mongoose.model('Seller', sellerSchema)