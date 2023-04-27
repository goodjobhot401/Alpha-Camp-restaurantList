// frame setting
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')


const routes = require('./routes')

const app = express()
const port = 3000

// mongoDB
if (process.env.NODE_ENV !== 'product') {
  require('dotenv').config()
}
require('./config/mongoose')

// session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// passport
usePassport(app)
// req.user => res.locals.user 
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// method-override
app.use(methodOverride('_method'))
// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// static file setting
app.use(express.static('public'))
// route
app.use(routes)


// listen on app.js
app.listen(port, () => {
  console.log(`This website is listening on http://localhost:${port}`)
})