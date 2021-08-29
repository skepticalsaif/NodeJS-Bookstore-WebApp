const mongoose = require('mongoose')

var customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'This field is required'
  },
  password: {
    type: String,
    required: 'This field is required'
  },
  address: {
    type: String,
    required: 'This field is required'
  },
})

mongoose.model('Customer', customerSchema)