import request from 'supertest';
import app from '../src/app';

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

// I mitt andra test POST vill jag testa att jag får tillbaka statuskod 201 vid giltig input, och statuskod 400 vid ogiltig input
    describe('POST /contact', () => {
        it('should return 201 with no content for valid input', async () => {
          const response = await request(app)
            .post('/contact')
            .send({
              "firstname": "Anna",
              "lastname": "Andersson",
              "email": "anna.andersson@gmail.com",
              "personalnumber": "550713-1405",
              "address": "Utvecklargatan 12",
              "zipCode": "111 22",
              "city": "Stockholm",
              "country": "Sweden"
            });
      
          expect(response.status).toBe(201);
          expect(response.body).toEqual({}); 
        });

      // testar ghär även att jag får tillbaka statuskod 400 och ett felmeddelande, om jag skickar in en ogiltig input
        it('should return 400 for invalid input', async () => {
          const response = await request(app)
            .post('/contact')
            .send({
              // Skickar här in en giltig input eftersom firstname saknas och förväntar mig att få tillbaka ett felmeddelande och statuskod 400
              "lastname": "Andersson",
              "email": "anna.andersson@gmail.com",
              "personalnumber": "550713-1405",
              "address": "Utvecklargatan 12",
              "zipCode": "111 22",
              "city": "Stockholm",
              "country": "Sweden"
            });
      
          expect(response.status).toBe(400);
          expect(response.body).toEqual([
            { "error": "firstname is missing" }            
          ]);
        });

        it('should return 400 for invalid input', async () => {
            const response = await request(app)
              .post('/contact')
              .send({
                // Skickar här in en giltig input eftersom lastname saknas och förväntar mig att få tillbaka ett felmeddelande och statuskod 400
                "firstname": "Anna",
                "email": "anna.andersson@gmail.com",
                "personalnumber": "550713-1405",
                "address": "Utvecklargatan 12",
                "zipCode": "111 22",
                "city": "Stockholm",
                "country": "Sweden"
              });
        
            expect(response.status).toBe(400);
            expect(response.body).toEqual([
              { "error": "lastname is missing" }            
            ]);
          });

          // lägger även in ett test för endpointen /does-not-exist, och förväntar mig att få tillbaka statuskod 404 och ett felmeddelande 
          it('should return status code 404 and an error message', async () => {
            const response = await request(app).get('/does-not-exist');
            expect(response.status).toBe(404);
            expect(response.text).toBe('Not found');

        });
        
          
});
