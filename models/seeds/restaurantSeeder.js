if (process.env.NODE_ENV !== 'product') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const Member = require('../user')
const restaurantsData = require('../seeds/restaurant.json').results
const memberData = require('./user.json')


db.once('open', () => {
  console.log('running restaurantSeeder script')

  const promises = memberData.map(USER => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(USER.password, salt))
      .then(hash => Member.create({
        name: USER.name,
        email: USER.email,
        password: hash
      }))
      .then(user => {
        const memberId = user._id
        const name = user.name
        let restaurant = []
        if (name === memberData[0].name) {
          restaurant = restaurantsData.slice(0, 3)
        } else {
          restaurant = restaurantsData.slice(3, 6)
        }
        return Restaurant.create(
          restaurant.map(r => Object.assign(r, { memberId }))
        )
      })
      .catch(err => console.log(err))
  })

  Promise.all(promises)
    .then(() => {
      console.log('restaurantSeeder done!')
      process.exit()
    })
    .catch(err => console.log(err))
})