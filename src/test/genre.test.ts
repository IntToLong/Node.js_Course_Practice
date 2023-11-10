import request from 'supertest';
import { connection, connect, disconnect } from 'mongoose';
import constants from '../constants';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { describe, expect, test } from '@jest/globals';
import { app, server } from '../index';
import supertest from 'supertest';

/* Connecting to the database before each test. */
beforeAll(async () => {
  await connection.close();
  const mongoServer = await MongoMemoryServer.create();
  await connect(mongoServer.getUri());
});

/* Dropping the database and closing connection after each test. */
afterAll(async () => {
  await disconnect();
  await connection.close();
});

// Closing server
afterAll((done) => {
  server.close(done);
});

describe('GET /genres', () => {
  test('responds with json', async () => {
    const response = await supertest(app).get('/genres');
    console.log(response);
    expect(response.type).toMatch('application/json');
    expect(response.status).toEqual(200);
    //expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('POST /genres', () => {
  describe('create a genre with proper body', () => {
    test('should return 200', async () => {
      const body = {
        name: 'GenreName',
      };
      const response = await request(app).post('/genres').send(body);
      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('GenreName');
    });
  });
  describe('create a genre with invalid body', () => {
    test('should return 400', async () => {
      const body = {
      };
      const response = await request(app).post('/genres').send(body);
      expect(response.status).toEqual(400);
    });
  });
});
