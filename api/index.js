const express = require('express')
const config = require('../config/loki')
const router = express.Router()
const pick = require('lodash/pick')
const userSchema = require('./schema/users')

config.init()
console.log('init database in API')
const db = config.getDatabase()
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
router.param('comment_id', (req, res, next, id) => {
    req.comment = comments.get(id)
    if (!(req.comment && req.comment.postId === req.post.id)) {
        res.status(404)
        req.comment = null
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
    .post((req, res, next) => {
        const { error, value} = userSchema.validate(req.body)
        if (!!error) {
            res.status(400).send(error.details)
        } else {
            let result = users.insert(value)
            result.id = result.$loki
            users.update(result)
            res.status(201).json(result)
        }
    })

router.route('/:user_id')
    .get((req, res, next) => {
        res.json(req.user)
    })
    .put((req, res, next) => {
        next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    })
    .post((req, res, next) => {
        const allow = "GET, PUT"
        res.status(405)
            .append("Allow", allow)
            .send("Allow: " + allow)
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
        const allow = "GET, PUT"
        res.status(405)
            .append("Allow", allow)
            .send("Allow: " + allow)
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    })

router.route('/:user_id/posts/:post_id/comments')
    .get((req, res, next) => {
        let result = comments.find({postId:req.post.id,})
        res.status(200).json({
            message: "Comments listed",
            length: result.length || "0",
            data: result || {}
        })
    })

router.route('/:user_id/posts/:post_id/comments/:comment_id')
    .get((req, res, next) => {
        res.json(req.comment)
    })
    .put((req, res, next) => {
        next(new Error('not implemented'))
    })
    .post((req, res, next) => {
        const allow = "GET, PUT"
        res.status(405)
            .append("Allow", allow)
            .send("Allow: " + allow)
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    })


module.exports = router
