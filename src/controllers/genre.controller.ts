import { NextFunction, Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler';
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
  try {
    const genre = await Genre.create({ name });
    res.send(genre);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
    res.send(genre);
  } catch (error: unknown) {
    if (id) {
      (error as AppError).statusCode = 404;
    }
    next(error);
  }
};

export const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByIdAndDelete(id);
    res.send(genre);
  } catch (error: unknown) {
    if (id) {
      (error as AppError).statusCode = 404;
    }
    console.error('Error:', error);
    next(error);
  }
};

export * as genreController from './genre.controller';
