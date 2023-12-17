import { Request, Response, Router } from 'express';
import { movieJoiSchema } from '../models/models.joi.validation';
import { movieController } from '../controllers/movie.controller';
import validateResource from '../middleware/validateResource';

const router: Router = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *       Movie:
 *         type: object
 *         properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          releaseDate:
 *            type: string
 *            format: date
 *          genre:
 *            type: array
 *            items:
 *             type: string
 *         example:
 *               title: "Indiana Jones and the Raiders of the Lost Ark"
 *               description: "In a race against time, Indiana Jones embarks on a perilous journey to locate the mystical Ark of the Covenant before it falls into the hands of Nazi forces during World War II."
 *               releaseDate: "1981-06-12T00:00:00.000Z"
 *               genre: ["Action"]
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     tags:
 *       - Movies
 *     summary: Create a new movie
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '200':
 *         description: Successful response.
 *       '400':
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid request."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error."
 */

// Create a new movie
router.post('/movies', validateResource(movieJoiSchema), movieController.createMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get all movies
 *     responses:
 *       '200':
 *         description: Successful response.
 *       '400':
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid request."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error."
 */
// Get all movies
router.get('/movies', movieController.getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     tags:
 *       - Movies
 *     summary: Update a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Movie'
 *     responses:
 *       '200':
 *         description: Successful response.
 *       '400':
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid request."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error."
 */

// Update a movie
router.put('/movies/:id', movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     tags:
 *       - Movies
 *     summary: Delete a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response.
 *       '400':
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid request."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error."
 */
// Delete a movie
router.delete('/movies/:id', movieController.deleteMovie);

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get movies by genre.
 *     parameters:
 *       - in: path
 *         name: genreName
 *         required: true
 *         description: The genre of the movies.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response.
 *       '400':
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid request."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error."
 */
// Searching for Movies by Genre
router.get('/movies/genre/:genreName', movieController.searchMoviesByGenre);

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
router.get('/health-check', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'Server is running!' });
});

export default router;
