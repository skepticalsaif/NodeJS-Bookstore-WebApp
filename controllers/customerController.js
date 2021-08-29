const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const Seller = mongoose.model('Seller')

router.get('/signup', (req, res) => {
  res.render('customer/signup')
})

router.post('/', (req, res) => {
  if (req.body._id == '') {
    insertCustomer(req, res)
  } else {
    console.log('Error during customer insertion t1')
  }
})

function insertCustomer(req, res) {
  var customer = new Customer()
  customer.username = req.body.username
  customer.password = req.body.password
  customer.address = req.body.address
  customer.save((err, doc) => {
    if (!err) {
      res.redirect('customer/allbooks')
    } else {
      console.log('Error during customer insertion t2')
    }
  })
}

router.get('/allbooks', (req, res) => {
  Seller.find((err, doc) => {
    if (!err) {
      res.render('customer/allbooks', {
        viewTitle: 'Book List',
        list: doc
      })
    } else {
      console.log('Error in retrieval : ' + err)
    }
  })
})

router.get('/:id', (req, res) => {
  Seller.findByIdAndUpdate({ _id: req.params.id },
    {
      $set: { sold: true }
    },
    { new: true },
    (err, docx) => {
      if (!err) {
        Seller.find({ sold: true }, (err, doc) => {
          //console.log(doc);
          if (!err) {
            res.render('customer/mybooks', {
              viewTitle: 'My Books',
              list: doc
            })
          } else {
            console.log('Error in : ' + err);
          }
        })
      } else {
        console.log('Error during pref retr : ' + err);
      }
    }
  )
})

router.get('/delete/:id', (req, res) => {
  Seller.findByIdAndUpdate({ _id: req.params.id },
    {
      $set: { sold: false }
    },
    { new: true },
    (err, docx) => {
      if (!err) {
        Seller.find({ sold: true }, (err, doc) => {
          //console.log(doc);
          if (!err) {
            res.render('customer/mybooks', {
              viewTitle: 'My Books',
              list: doc
            })
          } else {
            console.log('Error in deletion : ' + err);
          }
        })
      } else {
        console.log('Error in deletion : ' + err);
      }
    }
  )
})

module.exports = router