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

//Implementing express
const app = express();

//middleware
app.use(cors());
//enables us to recieve json data from a request
app.use(express.json());

//Defining PORT and validating env
const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

});


// ROUTES

// This route is hard coded, giving us a proof of life for our URL
// https://can-of-books-87b8.onrender.com/books <Notice how /books is at the end of this URL. This is how we access let books data.

//This route is for accessing the database
app.get('/books', getBooks);
//This route is for adding a whole new book object when a new request comes in
app.post('/books', postBooks);
//This route is for sending the ID of a book to delete as a path paremeter
app.delete('/books/:id', deleteBooks)
// This route is for putting the ID 
app.put('/books/:id', putBooks)


async function getBooks(req, res, next) {
  try {
    // This talks to your database
    let results = await Book.find({});
    res.status(200).send(results);
  } catch (err) {cd 
    next(err)
  }
};

//adding a new book object to database
async function postBooks(req, res, next) {
  try {
    let createdBook = await Book.create(req.body);
    res.status(200).send(createdBook);
  } catch (err) {
    next(err);
  }
};

async function deleteBooks(req, res, next) {
  try {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.status(200).send('Book Deleted');
  } catch (err) {
    next(err);
  }
}

async function putBooks(req, res, next) {
  try {
    let id = req.params.id;
    let bookFromReq = req.body;
    let options = {
      new: true,
      overwrite: true
    };
    let updatedBook = await Book.findByIdAndUpdate(id, bookFromReq, options);
    res.status(200).send(updatedBook);
  } catch (err) {
    next(err)
  }
}
// Once we are done we can test if this works in our thunder client.
// We use GET, http:localhost:3001
// We take the object that we want to edit and put it into the JSON body
// Next we take the ID and put it into our URL
// We make the necessary changes and hit send
// Finally we do another GET request to see if our update made the necessary changes. If yes, we were successful.




app.listen(PORT, () => console.log(`listening on ${PORT}`));

// let books = [
//   { title: 'legacy', description: 'writing guide', status: true }, 
//   { title: 'Hobits', description: 'one ring', status: false }
// ];
