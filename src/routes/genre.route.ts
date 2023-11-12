import { Router } from 'express';
import { genreController } from '../controllers/genre.controller';
import { genreJoiSchema } from '../models/models.joi.validation';
import validateResource from '../middleware/validateResourse';

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
router.post('/genres', validateResource(genreJoiSchema), genreController.createGenre);
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
// router.get('/genres', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const genres = await Genre.find({});
//     res.send(genres);
//   } catch (error: unknown) {
//     next(error);
//   }
// });
router.get('/genres', genreController.getAllGenres);

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
router.put('/genres/:id', validateResource(genreJoiSchema), genreController.updateGenre);

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
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 __v:
 *                   type: number
 *               example:
 *                 _id: "654f5c051aa0d0bfcba437d3"
 *                 name: "Action"
 *                 __v: 0
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
router.delete('/genres/:id', genreController.deleteGenre);

export default router;
