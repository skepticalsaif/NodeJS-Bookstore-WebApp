const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.DB_CONN, {
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