import request from 'supertest';

// I mitt första test GET, vill jag testa att jag får tillbaka statuskod 200 och ett meddelande, från mitt API
describe('GET /', () => {
  it('should return status code 200 and a welcome message', async () => {  // Test för rotendpointen
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to my API!');
  });

    it('should return status code 404 and an error message', async () => {  // Test för en endpoint som inte finns
        const response = await request(app).get('/does-not-exist');
    
        expect(response.status).toBe(404);
        expect(response.text).toBe('Not found');
    });
});

