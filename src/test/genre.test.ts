// import request from 'supertest';
// import { connection, connect, disconnect } from 'mongoose';

// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { describe, expect, test } from '@jest/globals';
// import createServer from '../utils/server';
// import { getAllGenres } from '../controllers/genre.controller';
// import { Request, Response } from 'express';
// import Genre from '../models/genre.model';

// const app = createServer();

// /* Connecting to the database before each test. */
// beforeAll(async () => {
//   const mongoServer = await MongoMemoryServer.create();
//   await connect(mongoServer.getUri());
// });

// /* Dropping the database and closing connection after each test. */
// afterAll(async () => {
//   await disconnect();
//   await connection.close();
// });

// // describe('GET /genres', () => {
// //   const genreRecords = [
// //     {
// //       name: 'Drama',
// //     },
// //     {
// //       name: 'Comedy',
// //     },
// //   ];
// //   const mock = jest.spyOn(Genre, 'find');
// //   mock.mockReturnValue(genreRecords);
// //   const mReq = {} as Request;
// //   const mRes = { send: jest.fn() };
// //   const mNext = jest.fn();
// //   test('should responds with json', async () => {
// //     const response = await request(app).get('/genres');
// //     expect(response.type).toMatch('application/json');
// //     expect(response.status).toEqual(200);
// //     //expect(response.body.length).toBeGreaterThan(0);
// //   });

// //   test('should called Genre.find', async () => {
// //     await getAllGenres(mReq as Request, mRes as Response, mNext);
// //     expect(mock).toHaveBeenCalled();
// //   });

// //   test('should return 200', async () => {
// //     await getAllGenres(mReq, mRes, mNext);
// //     expect(mRes.status).toHaveBeenCalledWith(200);
// //     expect(mRes.send).toHaveBeenCalledWith(genreRecords);
// //     expect(mNext).not.toHaveBeenCalled();
// //   });

// //   afterEach(() => {
// //     mock.mockRestore();
// //   });
// // });

// describe('POST /genres', () => {
//   describe('create a genre with proper body', () => {
//     test('should return 200', async () => {
//       const body = {
//         name: 'GenreName',
//       };
//       const response = await request(app).post('/genres').send(body);
//       expect(response.status).toEqual(200);
//       expect(response.body.name).toEqual('GenreName');
//     });
//   });
//   describe('create a genre with invalid body', () => {
//     test('should return 400', async () => {
//       const body = {};
//       const response = await request(app).post('/genres').send(body);
//       console.log(response);
//       console.log(response.status);
//       expect(response.status).toEqual(400);
//     });
//   });
// });
