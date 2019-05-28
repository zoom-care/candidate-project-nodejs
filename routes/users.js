const router = require('express').Router()
const db = require('../config/loki').getDatabase()
module.exports = router

const users = db.getCollection('users')

//GET user by id
router.get('/:userId', (req, res, next) => {
  const user = users.get(Number(req.params.userId))
  res.json(user)
})

//POST new user
router.post('/', (req, res, next) => {
  const { name, username, email, address, phone, website } = req.body
  const phoneNumbers = phone ? phone.split(', ') : ''

  if (!username || !email) {
    res.status(403).send('Please fill in required information.')
  }
  //check authorization
  if (!req.headers.authorization) {
    res.status(403).json({ error: 'Not authorized!' })
  }
  const newUser = users.insert({
    name,
    username,
    email,
    address,
    phoneNumbers,
    website,
  })

  if (newUser) {
    res.json(newUser)
  } else {
    res.status(500).send('An error occurred while creating user')
  }
})
