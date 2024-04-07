const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/order");

const app = express();

// Endpoint to get all users
app.get("/getAllOrder", async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (err) {
        res.status(400).json({ err: 'ERROR' });
    }
});

app.post("/addOrder", async (req, res) => {
    try {
        const newOrder = Order.createFromRequestBody(req.body);

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Failed to insert user" });
    }
});

module.exports = app;