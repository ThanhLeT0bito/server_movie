const express = require("express");
const movieRepository = require("../repositories/movieRepository");
const { generateSlug, filterMongooseText } = require('acd-util-help');
const _ = require('lodash');
const app = express();

app.get("/indexMovies", async (req, res) => {
    try {
        const { page = 1, limit = 10, filter = {}, filtersText = "" } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };
        const findParams = filterMongooseText({ _deleted: { $ne: true } }, filter, filtersText);
        const movies = await movieRepository.findMoviesWithPagination(findParams, options);
        res.json(movies);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to get movies" });
    }
});
app.get("/getAllMovies", async (req, res) => {
    try {
        const movies = await movieRepository.findAllMovies();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: "Failed to get movies" });
    }
});

app.post("/addMovie", async (req, res) => {
    try {
        // const slug = req.body.slug ? generateSlug(req.body.slug) : generateSlug(req.body.name);
        // const conditions = [{ name: req.body.name }, { slug }];
        // const findMovie = await movieRepository.findMovie(conditions);

        if (true) {
            const newMovie = await movieRepository.createMovie({ ...req.body});
            res.status(201).json(newMovie);
        } else {
            if (findMovie.name === req.body.name) {
                res.status(400).json({ error: `Movie name ${findMovie.name} is exist` });
            }
            if (findMovie.slug === slug) {
                res.status(400).json({ error: `Slug ${slug} is exist. Please change movie name ${findMovie.name}` });
            }
        }
    } catch (error) {
        console.error("Error inserting movie:", error);
        res.status(500).json({ error: "Failed to insert movie" });
    }
});

app.get("/getMovieById/:movieId", async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await movieRepository.findMovieById(movieId);
        if (movie && !movie._deleted) {
            res.json(movie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        console.error("Error finding movie:", error);
        res.status(500).json({ error: "Failed to find movie" });
    }
});

app.put("/updateMovie/:movieId", async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const genSlug = req.body.slug ? generateSlug(req.body.slug) : generateSlug(req.body.name);
        const findMovie = await movieRepository.findMovie([
            { _id: { $ne: movieId }, name: req.body.name },
            { _id: { $ne: movieId }, slug: genSlug },
        ]);

        if (!findMovie) {
            const updatedMovie = await movieRepository.updateMovieById(movieId, { ...req.body, slug: genSlug, updatedAt: new Date() });
            res.json(updatedMovie);
        } else {
            if (findMovie.name === req.body.name) {
                res.status(400).json({ error: `Movie name ${findMovie.name} is exist` });
            }
            if (findMovie.slug === genSlug) {
                res.status(400).json({ error: `Slug ${genSlug} is exist. Please change movie name ${findMovie.name}` });
            }
        }
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ error: "Failed to update movie" });
    }
});

app.delete("/deleteMovie/:movieId", async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const deletedMovie = await movieRepository.deleteMovieById(movieId);
        if (deletedMovie) {
            res.json(_.pick(deletedMovie, ['id', 'name', 'slug']));
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ error: "Failed to delete movie" });
    }
});

module.exports = app;