import { NextFunction, Request, Response, Router } from 'express';

import Movie from '../models/movie.model';

const router: Router = Router();

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

// Create a new movie
router.post('/movies', async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, releaseDate, genre } = req.body;

  try {
    const movie = new Movie({ title, description, releaseDate, genre });
    await movie.save();
    res.send(movie);
  } catch (error: unknown) {
    next(error);
  }
});

// Get all movies
router.get('/movies', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error: unknown) {
    next(error);
  }
});

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

//searching for Movies by Genre
router.get('/movies/genre/:genreName', async (req: Request, res: Response, next: NextFunction) => {
  const { genreName } = req.params;
  try {
    const movies = await Movie.find({ genre: { $in: new RegExp(genreName, 'i')} });
    res.send(movies);
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
