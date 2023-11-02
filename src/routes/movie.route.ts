import { NextFunction, Request, Response, Router } from 'express';

import Movie from '../models/movie.model';
import { movieSchema } from '../middleware/data_validation/schemas';

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
router.post('/movies', async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, releaseDate, genre } = req.body;
  const { error } = movieSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const movie = new Movie({ title, description, releaseDate, genre });
      await movie.save();
      res.send(movie);
    } catch (error: unknown) {
      next(error);
    }
  }
});

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
router.get('/movies', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error: unknown) {
    next(error);
  }
});

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
router.put('/movies/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, releaseDate, genre } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(id, { title, description, releaseDate, genre }, { new: true });
    res.send(movie);
  } catch (error: unknown) {
    next(error);
  }
});

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
router.delete('/movies/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    res.send(movie);
  } catch (error: unknown) {
    next(error);
  }
});

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
router.get('/movies/genre/:genreName', async (req: Request, res: Response, next: NextFunction) => {
  const { genreName } = req.params;
  try {
    const movies = await Movie.find({ genre: { $in: new RegExp(genreName, 'i') } });
    res.send(movies);
  } catch (error: unknown) {
    next(error);
  }
});

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
router.post('/health-set', (req: Request, res: Response): void => {
  if (typeof req.body.status === 'string') {
    res.status(201).json({ status: 'New Server status!' });
  } else {
    res.status(400).send('Bad request. Server status should be string type.');
  }
});

export default router;