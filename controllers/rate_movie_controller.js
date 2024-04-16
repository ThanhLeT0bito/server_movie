const express = require("express");
const RateMovie = require("../models/rate_movie");

const app = express();

// Endpoint to find rate movies by movieId
app.get("/findRateMoviesByMovieId/:movieId", async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const rateMovies = await RateMovie.find({ movieId: movieId });
        res.json(rateMovies);
    } catch (err) {
        res.status(500).json({ error: "Failed to find rate movies by movieId" });
    }
});

// Endpoint to insert a new rate movie
app.post("/insertRateMovie", async (req, res) => {
    try {
        const { movieId, userId, rate, comment } = req.body;
        const newRateMovie = RateMovie.createFromRequestBody(req.body);
        await newRateMovie.save();
        res.status(201).json({ message: "Rate movie created successfully" });
    } catch (error) {
        console.error("Error inserting rate movie:", error);
        res.status(500).json({ error: "Failed to insert rate movie" });
    }
});

// Endpoint to get all rate movies
app.get("/getAllRateMovies", async (req, res) => {
    try {
        const rateMovies = await RateMovie.find({});
        res.json(rateMovies);
    } catch (err) {
        res.status(500).json({ error: "Failed to get all rate movies" });
    }
});

module.exports = app;
