const express = require("express");
const Seat = require("../models/seat");

const app = express();

// Endpoint to get all seats
app.get("/getSeats", async (req, res) => {
    try {
        const seats = await Seat.find({});
        res.json(seats);
    } catch (err) {
        res.status(400).json({ error: 'Failed to get seats' });
    }
});

// Endpoint to find seats by movieId
app.get("/findSeatsByMovieId/:movieId", async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const seats = await Seat.find({ movieId: movieId });
        res.json(seats);
    } catch (err) {
        res.status(500).json({ error: "Failed to find seats by movieId" });
    }
});


// Endpoint to insert a new seat
app.post("/insertSeat", async (req, res) => {
    try {
        const { movieId, reserved, service } = req.body;
        const newSeat = Seat.createFromRequestBody(req.body);
        await newSeat.save();
        res.status(201).json({ message: "Seat created successfully" });
    } catch (error) {
        console.error("Error inserting seat:", error);
        res.status(500).json({ error: "Failed to insert seat" });
    }
});

// Endpoint to delete a seat
app.delete("/deleteSeat/:id", async (req, res) => {
    try {
        const seatId = req.params.id;
        await Seat.findByIdAndDelete(seatId);
        res.json({ message: "Seat deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete seat" });
    }
});

// Endpoint to update a seat
app.put("/updateSeat/:id", async (req, res) => {
    try {
        const seatId = req.params.id;
        const { movieId, reserved, service } = req.body;
        await Seat.findByIdAndUpdate(seatId, { movieId, reserved, service });
        res.json({ message: "Seat updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update seat" });
    }
});

module.exports = app;
