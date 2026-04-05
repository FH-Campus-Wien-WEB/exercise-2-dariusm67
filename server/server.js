const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  /* Task 1.2. Remove the line below and return the movies from 
     the model as an array */
  res.send(Object.values(movieModel));
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  // 1. Grab the exact ID from the URL (e.g., tt8633478)
    const id = req.params.imdbID;
    
    // 2. Look up that specific movie in your database
    const movie = movieModel[id];

    // 3. If the movie exists, send it! If not, send a 404 error.
    if (movie) {
        res.send(movie);
    } else {
        res.status(404).send("Movie not found");
    }
  })

// Configure a 'put' endpoint to update a specific movie
app.put('/movies/:imdbID', function (req, res) {
    const id = req.params.imdbID;
    const movieData = req.body; // The data sent from the form

    if (movieModel[id]) {
        // Task 3.1: Update existing movie
        movieModel[id] = movieData;
        res.sendStatus(200); 
    } else {
        // Task 3.2: Create new movie
        movieModel[id] = movieData;
        // Respond with 201 and send back the stored movie object
        res.status(201).send(movieData);
    }
});

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

