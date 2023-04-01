// frame setting
const express = require('express')
const ehbars = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

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
})

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', ehbars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file setting
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 瀏覽特定餐廳
app.get('/restaurant/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// 新增餐廳
app.post('/restaurants', (req, res) => {
  const restaurantData = req.body
  console.log(restaurantData)
  Restaurant.create(restaurantData)
    .then(restaurant => {
      const id = restaurant._id
      res.redirect(`/restaurant/${id}`)
    })
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// 編輯餐廳頁面
app.get('/restaurant/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// 編輯餐廳
app.post('/restaurant/:restaurantId/edit', (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .then((restaurant) => {
      for (const key in req.body) {
        restaurant[key] = req.body[key]
      }
      restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// 搜尋特定餐廳
app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }
  const keyword = req.query.keywords.toLowerCase().trim()
  const keywords = req.query.keywords
  return Restaurant.find({})
    .lean()
    .then((restaurants) => {
      const results = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants: results, keyword })
    })
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})



// 刪除餐廳
app.post('/restaurant/:restaurantId/delete', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// listen on app.js
app.listen(port, () => {
  console.log(`This website is listening on http://localhost:${port}`)
})