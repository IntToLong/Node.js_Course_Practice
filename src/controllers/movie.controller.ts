import { NextFunction, Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler';
import Movie from '../models/movie.model';

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, releaseDate, genre } = req.body;
  try {
    const movie = await Movie.create({ title, description, releaseDate, genre });
    res.send(movie);
  } catch (error: unknown) {
    next(error);
  }
};

export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, releaseDate, genre } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(id, { title, description, releaseDate, genre }, { new: true });
    res.send(movie);
  } catch (error: unknown) {
    if (id) {
      (error as AppError).statusCode = 404;
    }
    next(error);
  }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    res.send(movie);
  } catch (error: unknown) {
     if (id) {
       (error as AppError).statusCode = 404;
     }
    next(error);
  }
};

export const searchMoviesByGenre = async (req: Request, res: Response, next: NextFunction) => {
  const { genreName } = req.params;
  try {
    const movies = await Movie.find({ genre: { $in: new RegExp(genreName, 'i') } });
    res.send(movies);
  } catch (error: unknown) {
    next(error);
  }
};

export * as movieController from './movie.controller';
