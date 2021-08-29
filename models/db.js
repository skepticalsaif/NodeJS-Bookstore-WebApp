const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGODB_URI;

//require('dotenv/config')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
},
  err => {
    if (!err) {
      console.log('Connection succeeded')
    } else {
      console.log('Error in connection', + err)
    }
  }
)

require('./seller.model')
require('./customer.model')