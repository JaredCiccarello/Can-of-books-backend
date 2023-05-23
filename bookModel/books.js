'use strict'
/*
This is our book model
This is the modular approach. This is how we modularize your code.
Modular approach: Allows you to seperate the schema and model definition from the server code. This also helps with reusability in other parts of your application.
*/

const mongoose = require('mongoose')

const { Schema } = mongoose;

const bookSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    },
});

// Now we create the model
const bookModel = mongoose.model ('book', bookSchema)

// To export the the file we add module???.exports and the name of the schema we are referencing. book, the name we gave our schema, then dig into bookschema to get the data.
module.exports = bookModel;