const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantsData = require('../seeds/restaurant.json').results

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
  console.log('seeder connected too')
  // Restaurant.create(restaurantsData)
})