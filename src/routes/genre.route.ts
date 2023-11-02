import { NextFunction, Request, Response, Router } from 'express';

import Genre from '../models/genre.model';
import { genreSchema } from '../middleware/data_validation/schemas';

const router: Router = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      Genre:
 *       type: object
 *       properties:
 *         name:
 *            type: string
 *       example:
 *         name: "Sci-Fi"
 */

/**
 * @swagger
 * /genres:
 *   post:
 *     tags:
 *       - Genres
 *     summary: Create a new genre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                  name:
 *                     type: string
 *               example:
 *                      name: "Sci-Fi"
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

// Create a new genre
router.post('/genres', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const { error } = genreSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const genre = new Genre({ name });
      await genre.save();
      res.send(genre);
    } catch (error: unknown) {
      next(error);
    }
  }
  
});
/**
 * @swagger
 * /genres:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Get all genres
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
// Get all genres
router.get('/genres', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await Genre.find({});
    res.send(genres);
  } catch (error: unknown) {
    next(error);
  }
});

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     tags:
 *       - Genres
 *     summary: Update a genre by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Updated Genre Name"
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

// Update a genre
router.put('/genres/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    res.send(genre);
  } catch (error: unknown) {
    next(error);
  }
});

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     tags:
 *       - Genres
 *     summary: Delete a genre by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Genre deleted successfully."
 *       '400':
 *         description: Invalid request.
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
// Delete a genre
router.delete('/genres/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByIdAndDelete(id);
    res.send(genre);
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
