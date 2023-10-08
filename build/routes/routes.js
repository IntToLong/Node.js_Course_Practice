"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /health-check:
 *   get:
 *     tags:
 *        - Health
 *     description: Returns a JSON response indicating the server status.
 *     responses:
 *      200:
 *         description: OK
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                      example:
 *                          status: "Server is running!"
 *      404:
 *          description: Not Found
 *      500:
 *          description: Server Error
 */
router.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'Server is running!' });
});
/**
 * @swagger
 * /health-set:
 *  post:
 *     tags:
 *        - Health
 *     description: Sets the server status and returns a JSON response.
 *     requestBody:
 *          description: New status
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *     responses:
 *      201:
 *         description: Created
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                      example:
 *                          status: "New Server status!"
 *      400:
 *          description: Bad request. Server status should be string type.
 *      404:
 *          description: Not Found.
 */
router.post('/health-set', (req, res) => {
    res.status(201).json({ status: 'New Server status!' });
});
exports.default = router;
