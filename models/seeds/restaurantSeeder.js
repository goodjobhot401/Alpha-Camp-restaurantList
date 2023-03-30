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
  console.log('running restaurantSeeder script')

  Restaurant.create(restaurantsData)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(error => console.log(err))
})