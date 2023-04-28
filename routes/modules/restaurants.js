const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const restaurantData = req.body
  const memberId = req.user._id
  Restaurant.create({ ...restaurantData, memberId })
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
  const memberId = req.user._id
  const _id = req.params.restaurantId
  return Restaurant.findOne({ _id, memberId }) // 使用 findOne() 就必須以 mongoDB 相同的 _id 去查詢
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// Update
router.get('/:restaurantId/edit', (req, res) => {
  const memberId = req.user._id
  const _id = req.params.restaurantId
  return Restaurant.findOne({ _id, memberId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})


router.put('/:restaurantId', (req, res) => {
  const memberId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOneAndUpdate({ _id, memberId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => res.render('errorPage', { error: err.message }))
})

// Delete
router.delete('/:restaurantId', (req, res) => {
  const memberId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOneAndDelete({ _id, memberId })
    .then(() => res.redirect('/'))
    .catch(err => res.render('errorPage', { error: err.message }))
})

module.exports = router