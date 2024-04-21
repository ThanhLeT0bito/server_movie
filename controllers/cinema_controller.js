const express = require('express');
const Cinema = require('../models/cinema');

const app = express();

// API để tạo mới một rạp chiếu phim
app.post('/insertCinema', async (req, res) => {
    try {
        const { name, location, brand } = req.body;
        const newCinema = Cinema.createFromRequestBody(req.body);
        await newCinema.save();
        res.status(201).json({ message: "Cinema created successfully" });
    } catch (error) {
        console.error("Error inserting cinema:", error);
        res.status(500).json({ error: "Failed to insert cinema" });
    }
});

// API để lấy tất cả các rạp chiếu phim
app.get('/getAllCinemas', async (req, res) => {
    try {
        const cinemas = await Cinema.find({});
        res.json(cinemas);
    } catch (error) {
        console.error("Error fetching cinemas:", error);
        res.status(500).json({ error: "Failed to fetch cinemas" });
    }
});

module.exports = app;
