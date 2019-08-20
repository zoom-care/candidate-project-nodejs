const express = require('express');
const postService = require('../services/posts');

const router = new express.Router();

/**
 * @swagger
 *
 * components:
 *   parameters:
 *     postId:
 *       name: post id
 *       description: The post id number.
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         body:
 *           type: string
 *     PostsResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Post'
 */

/**
 * @swagger
 *
 * /posts:
 *  get:
 *    summary: Get All Posts
 *    description: Retrieve all posts.
 *    tags:
 *      - posts
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json; charset=UTF-8:
 *            schema:
 *             $ref: '#/components/schemas/PostsResponse'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *    security:
 *      - bearerAuth: []
 */
router.get('/', postService.getAllPosts);

/**
 * @swagger
 *
 * /posts/update/:postId:
 *  post:
 *    summary: Update Post
 *    description: Update a post with an ID.
 *    tags:
 *      - posts
 *    parameters:
 *      - $ref: '#/components/parameters/postId'
 *    requestBody:
 *      description: Post object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json; charset=UTF-8:
 *            schema:
 *             $ref: '#/components/schemas/Success'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *    security:
 *      - bearerAuth: []
 */
router.post('/update/:postId', postService.updatePost);

module.exports = router;
