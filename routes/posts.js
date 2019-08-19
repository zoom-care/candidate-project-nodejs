const express = require("express");
const postService = require("../services/posts");

const router = new express.Router();

/**
 * @swagger
 *
 * components:
 *  parameters:
 *    postId:
 *     name: postId
 *     description: The post id number.
 *     in: path
 *     required: true
 *     schema:
 *      type: string
 *
 *  schemas:
 *    PostResponse:
 *      type: object
 *      properties:
 *        userId:
 *          type: number
 *          description: Unique user id
 *        id:
 *          type: number
 *          description: The post id
 *        title:
 *          type: string
 *          description: The title of the post
 *        body:
 *          type: string
 *          description: The body of the post
 */

router.post("/update/:postId", postService.updatePost);

module.exports = router;
