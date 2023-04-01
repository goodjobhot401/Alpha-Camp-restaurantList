const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantsData = require('../seeds/restaurant.json').results

// connect mongoDB
if (process.env.NODE_ENV !== 'product') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('running restaurantSeeder script')
  Restaurant.create(restaurantsData)
    .then(() => {
      console.log('restaurantSeeder done!')
    })
    .catch(err => console.log(err))
})