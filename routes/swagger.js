/**
 * @swagger
 *
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        errorType:
 *          type: string
 *        stack:
 *          type: string
 *
 *  responses:
 *    NotFound:
 *      description: The specified resource was not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *    Unauthorized:
 *      description: Unauthorized
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *    BadRequest:
 *      description: Bad Request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *    Forbidden:
 *      description: Forbidden
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *
 */
module.exports = {
  components: {},
  openapi: "3.0.0",
  apis: ["routes/*.js"],
  info: {
    version: "1.0.0",
    title: "Candidate Project",
    description: "REST services to serve the experience"
  },
  servers: [{ url: "https://localhost:3001/v1" }]
};
