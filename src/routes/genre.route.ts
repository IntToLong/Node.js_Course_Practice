import { Request, Response, Router } from 'express';
import Genre from '../models/genre.model';

const router: Router = Router();


// Create a new genre
router.post('/genres', async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const genre = new Genre({ name });
    await genre.save();
    res.send(genre);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all genres
router.get('/genres', async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find({});
    res.send(genres);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a genre
router.put('/genres/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    res.send(genre);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a genre
router.delete('/genres/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const genre = await Genre.findByIdAndDelete(id);
    res.send(genre);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;