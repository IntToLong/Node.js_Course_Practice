import Joi from 'joi';
import { IGenre } from './genre.model';
import { IMovie } from './movie.model';

export const genreJoiSchema = Joi.object<IGenre>({
  name: Joi.string().required(),
});

export const movieJoiSchema = Joi.object<IMovie>({
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  releaseDate: Joi.string().isoDate().required(),
  genre: Joi.array().min(1).items(Joi.string()).required(),
});
