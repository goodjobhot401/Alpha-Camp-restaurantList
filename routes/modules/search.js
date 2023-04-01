const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// search
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.toLowerCase().trim()
  return Restaurant.find({})
    .lean()
    .then(() => console.log(keyword))
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

module.exports = router