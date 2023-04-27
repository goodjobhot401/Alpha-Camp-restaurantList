const express = require('express')
const router = express.Router()
const Member = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  Member.findOne({ email }).then(member => {
    if (member) {
      console.log('Member already registered!')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return Member.create({
        name,
        email,
        password
      })
        .then(() => res.render('index'))
        .catch(err => res.render('errorPage', { error: err.message }))
    }
  })
    .catch(err => res.render('errorPage', { error: err.message }))
})



module.exports = router