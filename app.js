// frame setting
const express = require('express')
const ehbars = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

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
    .catch(error => console.error(error))
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
    .catch(error => console.error(error))
})

// 新增餐廳
app.post('/restaurants', (req, res) => {
  const restaurantData = req.body
  Restaurant.create(restaurantData)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// 編輯餐廳頁面
app.get('/restaurant/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
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
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }

  const keywords = req.query.keywords // 內建的 key
  const keyword = req.query.keywords.trim().toLowerCase() // 輸入的值

  const filteredrestaurants = Restaurant.find(item => item.name.toLowerCase().includes(keyword) ||
    item.category.includes(keyword))
  res.render('index', { restaurantsData: filteredrestaurants, keywords })
})

// app.get('/search', (req, res) => {
//   const { keyword, category, rating } = req.query
//   Restaurant.find()
//     .lean()
//     .then((restaurants) => {
//       const filterData = filterRestaurants(restaurants, keyword, category, rating)
//       let notFound = filterData.length ? false : true
//       res.render('index', { restaurants: filterData, keyword, category, rating, notFound })
//     })
// })

// 刪除餐廳
app.post('/restaurant/:restaurantId/delete', (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.remove()
    })
    // 一直顯示 TypeError: restaurant.remove is not a function
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// listen on app.js
app.listen(port, () => {
  console.log(`This website is listening on http://localhost:${port}`)
})