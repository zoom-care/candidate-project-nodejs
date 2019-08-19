const express = require("express");
const userService = require("../services/users");

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
 *    UserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: Unique user id
 *        name:
 *          type: string
 *          description: user name
 *        username:
 *          type: string
 *          description: user username
 *        email:
 *          type: string
 *          description: user email
 *        address:
 *          type: object
 *          description: user address object
 *          properties:
 *            street:
 *              type: string
 *              description: street information
 *            city:
 *              type: string
 *              description: city information
 *            zipcode:
 *              type: string
 *              description: zipcode information
 *            geo:
 *              type: object
 *              description: user address object
 *              properties:
 *                lat:
 *                  type: string
 *                  description: geo latitude
 *                lng:
 *                  type: string
 *                  description: geo longitude
 *            phoneNumbers:
 *              type: string
 *              description: zipcode information
 *            website:
 *              type: string
 *              description: Customer website
 */

/**
 * @swagger
 *
 * /users:
 *  get:
 *    summary: Create User
 *    description: Add a new user to the users list.
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
 *      - BearerAuth: []
 */
router.post("/", userService.createUser);
/**
 * @swagger
 *
 * /users:
 *  get:
 *    summary: Get All Users
 *    description: Retrieve all users.
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
 *      - BearerAuth: []
 */
router.get("/", userService.getAllUsers);

module.exports = router;
