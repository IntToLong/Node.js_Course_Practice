/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import supertest from 'supertest';
import { describe, expect, test } from '@jest/globals';
import Movie from '../models/movie.model';
import createServer from '../utils/server';
import mongoose from 'mongoose';

const app = createServer();
const movieId = new mongoose.Types.ObjectId().toString();
const genreName = 'Sci-Fi';
const nonExistentGenre = 'nonExistentGenre';
const fieldsToTest = ['title', 'description', 'releaseDate', 'genre'];
const nonExistentId = 'non-existent Id';
const movieRecords = [
  {
    _id: movieId,
    title: 'Eternal Sunshine of the Spotless Mind',
    description: 'Clementine Kruczynski, has undergone a medical procedure...',
    releaseDate: '2004-03-19T00:00:00.000Z',
    genre: ['Drama', 'Romance', 'Sci-Fi'],
    __v: 0,
  },
  {
    _id: '654038f696462500a2e15e24',
    title: 'Indiana Jones and the Raiders of the Lost Ark',
    description: 'In a race against time, Indiana Jones...',
    releaseDate: '1981-06-12T00:00:00.000Z',
    genre: ['Action'],
    __v: 0,
  },
];
const newMovie = {
  title: 'Eternal Sunshine of the Spotless Mind',
  description: 'Clementine Kruczynski, has undergone a medical procedure...',
  releaseDate: '2004-03-19T00:00:00.000Z',
  genre: ['Drama', 'Romance', 'Sci-Fi'],
};

describe('GET /movies', () => {
  test('should return status code 200 and all movies', async () => {
    jest.spyOn(Movie, 'find').mockReturnValueOnce(movieRecords);
    const { statusCode, body } = await supertest(app).get('/movies');
    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(movieRecords);
  });
  test('should return server error', async () => {
    jest.spyOn(Movie, 'find').mockImplementation(() => {
      throw new Error();
    });
    const { statusCode } = await supertest(app).get('/movies');
    expect(statusCode).toBe(500);
  });
});

describe('POST /movies', () => {
  describe('create a movie with a proper request body', () => {
    test('should return status code 200 and new movie', async () => {
      const [moviePayload] = movieRecords;
      const mockCreate = jest.spyOn(Movie, 'create').mockReturnValueOnce(moviePayload);
      const { statusCode, body } = await supertest(app).post('/movies').send(newMovie);
      expect(mockCreate).toBeCalledWith(newMovie);
      expect(statusCode).toBe(200);
      expect(body).toEqual(moviePayload);
    });
  });
  describe('not create a movie with invalid request body', () => {
    describe('request body is empty', () => {
      test('should return status code 400', async () => {
        const emptyBody = {};
        const { statusCode } = await supertest(app).post('/movies').send(emptyBody);
        expect(statusCode).toBe(400);
      });
    });
    describe('one property in request body is undefined', () => {
      fieldsToTest.forEach((field) => {
        test(`should reject a movie without ${field}`, async () => {
          const invalidMovie = {
            ...newMovie,
            [field]: undefined,
          };
          const { statusCode } = await supertest(app).post('/movies').send(invalidMovie);
          expect(statusCode).toBe(400);
        });
      });
    });
    describe('one property in request body is empty', () => {
      fieldsToTest.forEach((field) => {
        test(`should reject a movie with empty ${field}`, async () => {
          const invalidMovie = {
            ...newMovie,
            [field]: '',
          };
          const { statusCode } = await supertest(app).post('/movies').send(invalidMovie);
          expect(statusCode).toBe(400);
        });
      });
    });
  });

  describe('should return server error', () => {
    test('should return server error', async () => {
      jest.spyOn(Movie, 'create').mockImplementation(() => {
        throw new Error();
      });
      const { statusCode } = await supertest(app).post('/movies').send(newMovie);
      expect(statusCode).toBe(500);
    });
  });
});

describe('PUT /movies/:id', () => {
  describe('update a movie with proper request body and id', () => {
    fieldsToTest.forEach((field) => {
      test(`should return status code 200 and movie with updated ${field}`, async () => {
        let updatedValue = 'updated';
        if (field === 'genre') {
          updatedValue = ['Updated'];
        }
        const updatedMovie = { ...movieRecords[0], [field]: updatedValue };
        const mockUpdate = jest.spyOn(Movie, 'findByIdAndUpdate').mockReturnValueOnce(updatedMovie);
        const { statusCode, body } = await supertest(app)
          .put(`/movies/${movieId}`)
          .send({ [field]: updatedValue });
        expect(statusCode).toBe(200);
        expect(mockUpdate).toBeCalledWith(movieId, { [field]: updatedValue }, { new: true });
        expect(body).toStrictEqual(updatedMovie);
      });
    });
  });

  describe('request with non-existent Id', () => {
    test('should return status code 404', async () => {
      const mockUpdate = jest.spyOn(Movie, 'findByIdAndUpdate');
      const { statusCode } = await supertest(app).put(`/movies/${nonExistentId}`).send(newMovie);
      expect(statusCode).toBe(404);
      expect(mockUpdate).toBeCalledWith(nonExistentId, newMovie, { new: true });
    });
  });
});

describe('DELETE /movies/:id', () => {
  const movieToBeDeleted = {
    _id: movieId,
    title: 'Indiana Jones and the Raiders of the Lost Ark',
    description: 'In a race against time, Indiana Jones...',
    releaseDate: '1981-06-12T00:00:00.000Z',
    genre: ['Action'],
    __v: 0,
  };
  describe('delete movie by Id', () => {
    describe('request with correct Id', () => {
      test('should return status code 200 and deleted movie', async () => {
        jest.spyOn(Movie, 'findByIdAndDelete').mockReturnValueOnce(movieToBeDeleted);
        const { statusCode, body } = await supertest(app).delete(`/movies/${movieId}`).send(movieId);
        expect(statusCode).toBe(200);
        expect(body).toEqual(movieToBeDeleted);
      });
    });
    describe('request with non-existent Id', () => {
      test('should return status code 404', async () => {
        jest.spyOn(Movie, 'findByIdAndDelete');
        const { statusCode } = await supertest(app).delete(`/movies/${nonExistentId}`).send(nonExistentId);
        expect(statusCode).toBe(404);
      });
    });
  });
});

describe('GET /movies/genre/:genreName', () => {
  describe('there are movie records with the "GenreName" genre', () => {
    test('should return status code 200 and all movies with "GenreName" genre', async () => {
      const mock = jest.spyOn(Movie, 'find').mockReturnValueOnce([movieRecords[0]]);
      const { statusCode, body } = await supertest(app).get(`/movies/genre/${genreName}`).send(genreName);
      expect(statusCode).toBe(200);
      expect(body).toEqual([movieRecords[0]]);
      expect(mock).toHaveBeenCalledWith({ genre: { $in: new RegExp(genreName, 'i') } });
    });
  });
  describe('there are no movie records with the "GenreName" genre', () => {
    test('should return status code 200 and empty array', async () => {
      const mock = jest.spyOn(Movie, 'find').mockReturnValueOnce([]);
      const { statusCode, body } = await supertest(app).get(`/movies/genre/${nonExistentGenre}`).send(nonExistentGenre);
      expect(statusCode).toBe(200);
      expect(body).toEqual([]);
      expect(mock).toHaveBeenCalledWith({ genre: { $in: new RegExp(nonExistentGenre, 'i') } });
    });
  });
  test('should handle case-insensitive genre search', async () => {
    const mockFind = jest.spyOn(Movie, 'find');
    mockFind.mockResolvedValue([movieRecords[0]]);
    const genreNameCI = 'Sci-FI';
    const response = await supertest(app).get(`/movies/genre/${genreNameCI}`).send(genreNameCI);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([movieRecords[0]]);
    expect(mockFind).toHaveBeenCalledWith({ genre: { $in: new RegExp(genreNameCI, 'i') } });
  });
  test('should return server error', async () => {
    jest.spyOn(Movie, 'find').mockImplementation(() => {
      throw new Error();
    });
    const { statusCode } = await supertest(app).get(`/movies/genre/${genreName}`);
    expect(statusCode).toBe(500);
  });
});
