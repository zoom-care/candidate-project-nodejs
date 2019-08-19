const express = require("express");
const commentService = require("../services/comments");

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
 *    commentId:
 *     name: commentId
 *     description: The comment id number.
 *     in: path
 *     required: true
 *     schema:
 *      type: string
 *
 *  schemas:
 *    CommentResponse:
 *      type: object
 *      properties:
 *        userId:
 *          type: number
 *          description: Unique user id
 *        id:
 *          type: number
 *          description: The comment id
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        body:
 *          type: string
 *          description: The body of the comment
 */

router.get("/post/:postId", commentService.getCommentsByPostId);
router.delete("/:commentId", commentService.deleteCommentById);

module.exports = router;
