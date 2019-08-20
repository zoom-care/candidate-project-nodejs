const express = require('express');
const userService = require('../services/users');

const router = new express.Router();

/**
 * @swagger
 *
 * components:
 *  parameters:
 *   accountNumber:
 *     name: accountNumber
 *     description: The SAP account number.
 *     in: path
 *     required: true
 *     schema:
 *      type: string
 *
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        address:
 *          type: object
 *          properties:
 *            street:
 *              type: string
 *            city:
 *              type: string
 *            zipcode:
 *              type: string
 *            geo:
 *              type: object
 *              properties:
 *                lat:
 *                  type: string
 *                  description: geo latitude
 *                lng:
 *                  type: string
 *                  description: geo longitude
 *        phoneNumbers:
 *          type: array
 *          items:
 *            type: string
 *        website:
 *          type: string
 *    UserResponse:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 *
 * /users:
 *  get:
 *    summary: Get All Users
 *    description: Retrieve all users.
 *    tags:
 *      - users
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json; charset=UTF-8:
 *            schema:
 *             $ref: '#/components/schemas/UserResponse'
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
router.get('/', userService.getAllUsers);

/**
 * @swagger
 *
 * /users:
 *  post:
 *    summary: Create User
 *    description: Add a new user to the users list.
 *    tags:
 *      - users
 *    requestBody:
 *      description: User object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
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
router.post('/', userService.createUser);

module.exports = router;
