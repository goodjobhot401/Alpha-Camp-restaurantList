const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// search
router.get('/', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  const sortMethod = req.query.sort
  let sortKeyword = { name: 'asc' }

  if (sortMethod === 'Z > A')
    sortKeyword = { name: 'desc' }

  if (sortMethod === '類別')
    sortKeyword = { category: 'asc' }

  if (sortMethod === '地區')
    sortKeyword = { location: 'asc' }

  const memberId = req.user._id

  return Restaurant.find({ memberId })
    .lean()
    .sort(sortKeyword)
    .then(restaurantsData => {
      const results = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword) ||
          data.name_en.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurantsData: results, keyword, sortMethod })
    })
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

module.exports = router