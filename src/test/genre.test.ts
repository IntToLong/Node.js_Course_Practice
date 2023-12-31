/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import supertest from 'supertest';
import { describe, expect, test } from '@jest/globals';
import Genre from '../models/genre.model';
import createServer from '../utils/server';
import mongoose from 'mongoose';

const app = createServer();
const genreId = new mongoose.Types.ObjectId().toString();
const genreRecords = [
  {
    _id: '653ad072352c17eade569c5a',
    name: 'Drama',
    __v: 0,
  },
  {
    _id: '653ad07e352c17eade569c5c',
    name: 'Comedy',
    __v: 0,
  },
];
const nonExistentId = 'non-existent Id';

describe('GET /genres', () => {
  test('should return all genres', async () => {
    jest.spyOn(Genre, 'find').mockReturnValueOnce(genreRecords);
    const { statusCode, body } = await supertest(app).get('/genres');
    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(genreRecords);
  });
  test('should return server error', async () => {
    jest.spyOn(Genre, 'find').mockImplementation(() => {
      throw new Error();
    });
    const { statusCode } = await supertest(app).get('/genres');
    expect(statusCode).toBe(500);
  });
});

describe('POST /genres', () => {
  describe('create a genre with a proper request body', () => {
    test('should return status code 200 and new genre', async () => {
      const genrePayload = {
        _id: genreId,
        name: 'Drama',
        __v: 0,
      };
      const mock = jest.spyOn(Genre, 'create').mockReturnValueOnce(genrePayload);
      const input = {
        name: 'Drama',
      };
      const { statusCode, body } = await supertest(app).post('/genres').send(input);
      expect(statusCode).toEqual(200);
      expect(body).toEqual(genrePayload);
      expect(mock).toHaveBeenCalledWith(input);
    });
  });
  describe('not create a genre with invalid request body', () => {
    describe('body without name', () => {
      test('should return status code 400 and error message "name" is required"', async () => {
        const input = {};
        const { statusCode, body } = await supertest(app).post('/genres').send(input);
        expect(statusCode).toEqual(400);
        expect(body).toEqual({ error: '"name" is required' });
      });
    });
    describe('body with empty "name"', () => {
      test('should return status code 400 and error message "name" is not allowed to be empty"', async () => {
        const input = { name: '' };
        const { statusCode, body } = await supertest(app).post('/genres').send(input);
        expect(statusCode).toEqual(400);
        expect(body).toEqual({ error: '"name" is not allowed to be empty' });
      });
    });
  });
  test('should return server error', async () => {
    const input = {
      name: 'Drama',
    };
    jest.spyOn(Genre, 'create').mockImplementation(() => {
      throw new Error();
    });
    const { statusCode } = await supertest(app).post('/genres').send(input);
    expect(statusCode).toBe(500);
  });
});

describe('DELETE /genres/:id', () => {
  const genreToBeDeleted = {
    _id: genreId,
    name: 'Comedy',
    __v: 0,
  };
  describe('delete genre by Id', () => {
    describe('request with correct Id', () => {
      test('should return status code 200 and deleted genre', async () => {
        jest.spyOn(Genre, 'findByIdAndDelete').mockReturnValueOnce(genreToBeDeleted);
        const { statusCode, body } = await supertest(app).delete(`/genres/${genreId}`).send(genreId);
        expect(statusCode).toBe(200);
        expect(body).toEqual(genreToBeDeleted);
      });
    });
    describe('request with non-existent Id', () => {
      test('should return status code 404', async () => {
        jest.spyOn(Genre, 'findByIdAndDelete');
        const { statusCode } = await supertest(app).delete(`/genres/${nonExistentId}`).send(nonExistentId);
        expect(statusCode).toBe(404);
      });
    });
  });
});

describe('PUT /genres/:id', () => {
  const updatedGenre = {
    _id: genreId,
    name: 'Updated genre',
    __v: 0,
  };
  const newName = {
    name: 'Updated genre',
  };
  describe('update a genre with proper request body and id', () => {
    test('should return status code 200 and updated genre', async () => {
      const mockUpdate = jest.spyOn(Genre, 'findByIdAndUpdate').mockReturnValueOnce(updatedGenre);
      const { statusCode, body } = await supertest(app).put(`/genres/${genreId}`).send(newName);
      expect(statusCode).toBe(200);
      expect(mockUpdate).toBeCalledWith(genreId, newName, { new: true });
      expect(body).toStrictEqual(updatedGenre);
    });
  });
  describe('request with non-existent Id', () => {
    test('should return status code 404', async () => {
      const mockUpdate = jest.spyOn(Genre, 'findByIdAndUpdate');
      const { statusCode } = await supertest(app).put(`/genres/${nonExistentId}`).send(newName);
      expect(statusCode).toBe(404);
      expect(mockUpdate).toBeCalledWith(nonExistentId, newName, { new: true });
    });
  });
});
