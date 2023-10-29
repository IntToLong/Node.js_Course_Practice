import { NextFunction, Request, Response, Router } from 'express';
import Genre from '../models/genre.model';

const router: Router = Router();

// Create a new genre
router.post('/genres', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const genre = new Genre({ name });
    await genre.save();
    res.send(genre);
  } catch (error: unknown) {
    next(error);
  }
});

// Get all genres
router.get('/genres', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await Genre.find({});
    res.send(genres);
  } catch (error: unknown) {
    next(error);
  }
});

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
