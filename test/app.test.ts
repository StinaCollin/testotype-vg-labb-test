import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('should return status code 200 and a welcome message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to my API!');
  });
});
