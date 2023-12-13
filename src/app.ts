import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my API!');
});

app.post('/contact', (req, res) => {
    const { firstname, lastname, email, personalnumber, address, zipCode, city, country } = req.body;
  
    if (!firstname) {
      return res.status(400).json([{ error: 'firstname is missing' }]);
    }
  
    if (!lastname) {
      return res.status(400).json([{ error: 'lastname is missing' }]);
    }
  
    res.status(201).json({});
  });

  // detta är en middleware som fångar upp alla requests som inte matchar någon av de routes som finns ovanför
  app.use((req, res) => {
    res.status(404).send('Not found');
  }); 

export default app;