const mongoose = require('mongoose')
const MONGO_URL = 'mongodb://localhost:27017/LibraryTestDB';
//require('dotenv/config')

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true
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