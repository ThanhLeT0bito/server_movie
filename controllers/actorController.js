const express = require("express");
const Actor = require("../models/actor");

const               app = express();

// Endpoint to get all actors
app.get("/getActors", async (req, res) => {
    try {
        const actors = await Actor.find({});
        res.json(actors);
    } catch (err) {
        res.status(400).json({ error: 'Failed to get actors' });
    }
});

// Endpoint to find an actor by ID
app.get("/findActor/:id", async (req, res) => {
    try {
        const actorId = req.params.id;
        const actor = await Actor.findById(actorId);
        if (!actor) {
            return res.status(404).json({ error: "Actor not found" });
        }
        res.json(actor);
    } catch (err) {
        res.status(500).json({ error: "Failed to find actor" });
    }
});

// Endpoint to insert a new actor
app.post("/insertActor", async (req, res) => {
    try {
        const { name, images } = req.body;
        const newActor = Actor.createFromRequestBody(req.body);
        await newActor.save();
        res.status(201).json({ message: "Actor created successfully" });
    } catch (error) {
        console.error("Error inserting actor:", error);
        res.status(500).json({ error: "Failed to insert actor" });
    }
});

// Endpoint to delete an actor
app.delete("/deleteActor/:id", async (req, res) => {
    try {
        const actorId = req.params.id;
        await Actor.findByIdAndDelete(actorId);
        res.json({ message: "Actor deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete actor" });
    }
});

// Endpoint to update an actor
app.put("/updateActor/:id", async (req, res) => {
    try {
        const actorId = req.params.id;
        const { name, images } = req.body;
        await Actor.findByIdAndUpdate(actorId, { name, images });
        res.json({ message: "Actor updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update actor" });
    }
});

module.exports = app;
