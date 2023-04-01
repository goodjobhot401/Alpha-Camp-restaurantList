const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// routes setting
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

module.exports = router
