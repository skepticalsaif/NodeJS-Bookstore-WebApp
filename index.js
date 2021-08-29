require('./models/db')

const PORT = process.env.PORT
const express = require('express')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const sellerController = require('./controllers/sellerController')
const customerController = require('./controllers/customerController')

var app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      rel="stylesheet"
    />
    <style>
      #box {
        background-color: #fff;
        margin-top: 25px;
        padding: 20px;
        -webkit-box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, 0.75);
        -moz-box-shadow:
          10px 10px 20px 1px rgba(0, 0, 0, 0.75);
        box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, 0.75);
        border-radius: 10px 10px 10px 10px;
        -webkit-border-radius: 10px 10px 10px 10px;
        -moz-border-radius: 10px 10px 10px 10px;
        border: 0px solid #000000
      }
    </style>
    <body class="bg-dark">
      <div id="box" class="col-md-6 offset-md-3 text-center">
        <i class="fab fa-node-js fa-2x"></i>
        <h1>Online Bookstore</h1>
        <h3>Choose your role</h3>
        <a class="btn btn-dark" href="/seller/list">Seller</a>
        <a class="btn btn-dark" href="/customer/signup">Customer</a>
      </div>
    </body>
  `)
})

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(handlebars),
  extname: 'hbs',
  defaultLayout: 'MainLayout',
  layoutsDir: __dirname + '/views/layouts/'
}))

app.set('view engine', 'hbs')

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})

app.use('/seller', sellerController)
app.use('/customer', customerController)