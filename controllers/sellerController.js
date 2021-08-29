const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Seller = mongoose.model('Seller')

router.get('/', (req, res) => {
  res.render('seller/addOrEdit', {
    viewTitle: 'Insert new book'
  })
})

router.post('/', (req, res) => {
  if (req.body._id == '') {
    insertRecord(req, res)
  } else {
    updateRecord(req, res)
  }
})

function insertRecord(req, res) {
  var seller = new Seller()
  seller.name = req.body.name
  seller.author = req.body.author
  seller.price = req.body.price
  seller.save((err, doc) => {
    if (!err) {
      res.redirect('seller/list')
    } else {
      console.log('Error during insert: ' + err)
    }
  })
}

function updateRecord(req, res) {
  Seller.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect('seller/list')
      } else {
        console.log('Error during update: ' + err)
      }
    })
}

router.get('/soldbooks', (req, res) => {
  Seller.find({ sold: true }, (err, doc) => {
    //console.log(doc);
    if (!err) {
      res.render('seller/soldbooks', {
        list: doc
      })
    } else {
      console.log('Error in pref del : ' + err);
    }
  })
})

router.get('/list', (req, res) => {
  Seller.find((err, docs) => {
    if (!err) {
      res.render('seller/list', {
        list: docs
      })
    } else {
      console.log('Error in retrieval: ' + err)
    }
  })
})

router.get('/:id', (req, res) => {
  Seller.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render('seller/addOrEdit', {
        viewTitle: 'Update a book',
        seller: doc
      })
      console.log(doc)
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Seller.findByIdAndRemove(req.params.id, (err, docx) => {
    if (!err) {
      Seller.find((err, doc) => {
        if (!err) {
          res.render('seller/list', {
            list: doc
          })
        } else {
          console.log('Error in deletion : ' + err)
        }
      })
    } else {
      console.log('Error in deletion : ' + err)
    }
  })
})

module.exports = router