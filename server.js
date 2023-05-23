'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


// This is what you will need to connect with mongoose, as well as getting the URL to work in the .env
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', _ => {
  console.log('We\'re connected!');
});

// This is where we require the schema into your server.
const Book = require('./bookModel/books');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

});


// ROUTES

// This route is hard coded, giving us a proof of life for our URL
// https://can-of-books-87b8.onrender.com/books <Notice how /books is at the end of this URL. This is how we access let books data.

// This will give you "hello there" until you look for /books
app.get('/', (req, res) =>{
  res.send('Hello there');
})

// Using /books will render the request below
app.get('/books', getBooks);
async function getBooks(req, res, next) {
  try {
                   // This talks to your database
    let results = await Book.find({});
    res.status(200).send(results);
  } catch (err) {
    next(err)
  }
};






app.listen(PORT, () => console.log(`listening on ${PORT}`));

// let books = [
//   { title: 'legacy', description: 'writing guide', status: true }, 
//   { title: 'Hobits', description: 'one ring', status: false }
// ];