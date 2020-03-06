const express = require('express')
const config = require('../config/loki')
config.init()
console.log('init database in API')
const db = config.getDatabase()

const router = express.Router()
const users = db.getCollection('users')
const posts = db.getCollection('posts')
const comments = db.getCollection('comments')

router.param('user_id', (req, res, next, id) => {
    req.user = users.get(id)
    if (!req.user) res.status(404)
    next()
})

router.param('post_id', (req, res, next, id) => {
    req.post = posts.get(id)
    if (!(req.post && req.post.userId === req.user.id)) {
        res.status(404)
        req.post = null
    }
    next()
})

router.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            message: "Users listed",
            length: users && users.data && users.data.length || "0",
            data: users && users.data || {}
        })
    })

router.route('/:user_id')
    .get((req, res, next) => {
        res.json(req.user)
    })
    .put((req, res, next) => {
        next(new Error('not implemented'))
    })
    .post((req, res, next) => {
        next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    })

// these should be imported from separate files
router.route('/:user_id/posts')
    .get((req, res, next) => {
        let result = posts.find({userId:req.user.id})
        res.status(200).json({
            message: "Posts listed",
            length: result.length || "0",
            data: result || {}
        })
    })

router.route('/:user_id/posts/:post_id')
    .get((req, res, next) => {
        res.json(req.post)
    })
    .put((req, res, next) => {
        next(new Error('not implemented'))
    })
    .post((req, res, next) => {
        next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    })


module.exports = router
