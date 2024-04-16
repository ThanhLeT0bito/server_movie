const express = require("express");
const Review = require("../models/review");

const app = express();

// Endpoint to get all reviews
app.get("/getAllReviews", async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to get all reviews" });
    }
});

// Endpoint to find reviews by movieId
app.get("/findReviewsByMovieId/:movieId", async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviews = await Review.find({ movieId: movieId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to find reviews by movieId" });
    }
});

// Endpoint to find reviews by reviewParentId
app.get("/findReviewsByReviewParentId/:reviewParentId", async (req, res) => {
    try {
        const reviewParentId = req.params.reviewParentId;
        const reviews = await Review.find({ reviewParentId: reviewParentId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to find reviews by reviewParentId" });
    }
});

// Endpoint to insert a new review
app.post("/insertReview", async (req, res) => {
    try {
        const { movieId, userId, reviewParentId, comment, love } = req.body;
        const newReview = new Review({
            movieId: movieId,
            userId: userId,
            reviewParentId: reviewParentId,
            comment: comment,
            love: love
        });
        await newReview.save();
        res.status(201).json({ message: "Review created successfully" });
    } catch (error) {
        console.error("Error inserting review:", error);
        res.status(500).json({ error: "Failed to insert review" });
    }
});

// Endpoint to update love for a review
app.put("/updateLove/:reviewId", async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        review.love++;
        await review.save();
        res.json({ message: "Love updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update love for review" });
    }
});


module.exports = app;
