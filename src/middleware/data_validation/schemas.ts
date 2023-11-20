import Joi from 'joi';
import { IGenre } from '../../models/genre.model';
import { IMovie } from '../../models/movie.model';

export const genreSchema = Joi.object<IGenre>({
  name: Joi.string().required(),
});

export const movieSchema = Joi.object<IMovie>({
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  releaseDate: Joi.string().isoDate().required(),
  genre: Joi.array().min(1).items(Joi.string()).required(),
});

