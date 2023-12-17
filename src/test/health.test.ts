/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import supertest from 'supertest';
import { describe, expect, test } from '@jest/globals';
import createServer from '../utils/server';

const app = createServer();

describe('GET /health-check', () => {
  test('should return status code 200 and status message', async () => {
    const { statusCode, body } = await supertest(app).get('/health-check');
    expect(statusCode).toBe(200);
    expect(body).toEqual({ status: 'Server is running!' });
  });
});
