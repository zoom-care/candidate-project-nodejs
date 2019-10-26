'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const CommentRepository = require('../respositories/CommentRepository');
const Comment = require('../models/Comment');

router.get('/', (req, res) => {
    return res.json(CommentRepository.find({
        postId: parseInt(req.params.postId)
    }));
});

router.delete('/:id', (req, res) => {
    const post = CommentRepository.find({
        postId: parseInt(req.params.postId),
        id: parseInt(req.params.id),
    })[0];

    if(post) {
        CommentRepository.remove(post);
        return res.status(200).send();
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
});


module.exports = router;