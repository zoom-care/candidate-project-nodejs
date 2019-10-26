'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const PostRepository = require('../respositories/PostRepository');
const Post = require('../models/Post');

router.get('/', (req, res) => {
    return res.json(PostRepository.find({ 
        userId: parseInt(req.params.userId) 
    }));
});

router.get('/:id', (req, res) => {
    const userPost = PostRepository.find({ 
        userId: parseInt(req.params.userId), 
        id: parseInt(req.params.id)
    })[0];

    if(userPost) {
        return res.json(userPost);
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
});

router.put('/:id', (req, res) => {
    const post = PostRepository.find({
        userId: parseInt(req.params.userId), 
        id: parseInt(req.params.id)
    })[0];

    if(post) {
        const updatedPost = Post.form(Object.assign(post, req.body));
        const validation = Post.schema.validate(updatedPost);

        if(validation.error) {
            return res.status(400).json({ message: validation.error.message });
        } else {
            // No ID increment here in the interest of simplicity (wasn't listed as a requirement)
            return res.json(PostRepository.insertOne(updatedPost));
        }
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
});


module.exports = router;