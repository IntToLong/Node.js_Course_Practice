import Joi from 'joi';

export const genreSchema = Joi.object({
  name: Joi.string().required(),
});

export const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  releaseDate: Joi.string().isoDate().required(),
  genre: Joi.array().min(1).items(Joi.string()).required()
});

