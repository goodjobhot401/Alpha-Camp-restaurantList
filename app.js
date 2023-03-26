// frame setting
const express = require('express')
const ehbars = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000
const restaurantsData = require('./restaurant.json').results


// connect mongoDB
if (process.env.NODE_ENV !== 'product') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantsData)
})


// setting template engine
app.engine('handlebars', ehbars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file setting
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurantsData })
})

app.get('/restaurant/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = restaurantsData.find(item => item.id === Number(restaurantId))
  res.render('show', { restaurantData })
})

app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filteredrestaurants = restaurantsData.filter(
    item => item.name.toLowerCase().includes(keyword) ||
      item.category.includes(keyword))
  res.render('index', { restaurantsData: filteredrestaurants, keywords })
})

// listen on app.js
app.listen(port, () => {
  console.log(`This website is listening on http://localhost:${port}`)
})