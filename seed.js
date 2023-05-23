'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
// connect Mongoose to our MongoDB on Atlas
mongoose.connect(process.env.MONGODB_URL);

// need to bring in a scheme if we want to interact with that collection
const books = require('./bookModel/books');

// this only needs to run once.
// we don't need to continually add the same cats to the database
async function seed() {
  // the structure of each cat I add has to be the same as my cat schema
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true},
  await books.create({
    title: 'Alchemist Cat',
    description: 'orange chemist',
    status: true,
  });
  console.log('Alchemist Cat was added to the database');

  await books.create({
    title: 'Harry Potter',
    description: 'Sorcerers stone',
    status: true,
  });
  console.log('Harry Potter was added to the database');

  await books.create({
    title: 'Captain America',
    description: 'American Glory',
    status: true,
  });
  console.log('Captain America was added to the database');
  mongoose.disconnect();
}

seed();

// to evoke this file run this in the terminal: (node and then the name of the file)
// ex.:
// node seed.js