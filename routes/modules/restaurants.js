const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const restaurantData = req.body
  console.log(restaurantData)
  Restaurant.create(restaurantData)
    .then(restaurant => {
      const id = restaurant._id
      res.redirect(`/restaurants/${id}`)
    })
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// Detail
router.get('/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// Update
router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render('edit', { restaurantData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

router.put('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => console.log)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
  // 方法 2 
  // const id = req.params.restaurantId
  // Restaurant.findById(id)
  //   .then((restaurant) => {
  //     for (const key in req.body) {
  //       restaurant[key] = req.body[key]
  //     }
  //     restaurant.save()
  //   })
  //   .then(() => res.redirect('/'))
  //   .catch(err => {
  //     console.log(err)
  //     res.render('errorPage', { error: err.message })
  //   })
})

// Delete
router.delete('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

module.exports = router