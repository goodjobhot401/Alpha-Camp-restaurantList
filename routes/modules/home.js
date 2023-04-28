const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// routes setting
router.get('/', (req, res) => {
  const memberId = req.user._id // 寫作 req.user_id 是因為 passport 中正序列化增加了 user.id 
  Restaurant.find({ memberId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

module.exports = router
