/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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

describe('GET /genres', () => {
  test('should return all genres', async () => {
    const mock = jest
      .spyOn(Genre, 'find')
      //@ts-ignore
      .mockReturnValueOnce(genreRecords);
    const { statusCode, body } = await supertest(app).get('/genres');
    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(genreRecords);
  });
});

describe('POST /genres', () => {
  describe('create a genre with proper body', () => {
    test('should return 200', async () => {
      const genrePayload = {
        _id: genreId,
        name: 'Drama',
        __v: 0,
      };
      const mock = jest
        .spyOn(Genre, 'create')
        //@ts-ignore
        .mockReturnValueOnce(genrePayload);
      const input = {
        name: 'Drama',
      };
      const { statusCode, body } = await supertest(app).post('/genres').send(input);
      expect(statusCode).toEqual(200);
      expect(body).toEqual(genrePayload);
      expect(mock).toHaveBeenCalledWith(input);
    });
  });
  describe('create a genre with invalid body', () => {
    test('should return 400 and error message', async () => {
      const input = {};
      const { statusCode, body } = await supertest(app).post('/genres').send(input);
      expect(statusCode).toEqual(400);
      expect(body).toEqual({ error: '"name" is required' });
    });
  });
});

describe('DELETE /genres', () => {
  const genreToDeletion = {
    _id: genreId,
    name: 'Comedy',
    __v: 0,
  };
  describe('delete genre by Id', () => {
    describe('correct Id', () => {
      test('should return 200 and deleted genre', async () => {
        const mockFindById = jest
          .spyOn(Genre, 'findById')
          //@ts-ignore
          .mockReturnValueOnce(genreToDeletion);
        const mockDelete = jest
          .spyOn(Genre, 'findByIdAndDelete')
          //@ts-ignore
          .mockReturnValueOnce(genreToDeletion);
        const response = await supertest(app).delete('/genres').send(genreId);
        console.log('response', response);
        const { statusCode, body } = await supertest(app).delete(`/genres/${genreId}`).send(genreId);
        expect(statusCode).toBe(200);
        expect(body).toEqual(genreToDeletion);
      });
    });
  });
});
