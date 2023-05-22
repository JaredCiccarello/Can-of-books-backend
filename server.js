'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', (request, response) => {
  let books = [{title:'legacy',description:'writing guide',status:true},{title:'Hobits',description:'one ring',status:false}];
  

  response.send(books)

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
