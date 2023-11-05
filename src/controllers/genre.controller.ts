import { NextFunction, Request, Response } from 'express';
import { genreSchema } from '../middleware/data_validation/schemas';
import Genre from '../models/genre.model';

export const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await Genre.find({});
    res.send(genres);
  } catch (error: unknown) {
    next(error);
  }
};

export const createGenre = async (req: Request, res: Response, next: NextFunction) => {
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
};

export const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    res.send(genre);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByIdAndDelete(id);
    res.send(genre);
  } catch (error: unknown) {
    next(error);
  }
};

export * as genreController from './genre.controller';
