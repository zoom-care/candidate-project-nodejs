var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const routes = require('./routes/routes')
const cors = require('cors')
const db = require('./db')
db.initDb()

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(cors())  // cors for all apis and all origins
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' })
})
app.get('/health', (req, res, next) => {
  res.sendStatus(200)
  next()
})
app.use('/api/v1', routes)

module.exports = app
