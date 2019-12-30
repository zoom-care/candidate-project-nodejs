const express = require('express')
const fs = require("fs")
const users = require('../controllers/userController')
const Ajv = require('ajv')
const ajv = Ajv({ allErrors: true })
const _ = require("lodash")
const mutatorMethods = ["PUT", "POST"]
const router = express.Router()

const userSchema = function () {
  const file = process.cwd() + "/schema/user.schema.json"
  return JSON.parse(fs.readFileSync(file))
}()
var validate = ajv.compile(userSchema)

function validateUser(req, res, next) {
  if (mutatorMethods.includes(req.method) && validate(req.body)) {
    next()
  }
  else {
    console.log("Invalid User Object")
    res.sendStatus(422)
  }
}

// path = /api/users
router.use(validateUser)
router.get('/:userid', users.getUser)
router.post('/', users.postUser)

module.exports = router