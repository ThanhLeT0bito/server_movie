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

// Endpoint to find order by id
app.get("/getOrderById/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error finding order:", error);
        res.status(500).json({ error: "Failed to find order" });
    }
});

// get list order by UserId
app.get("/getOrdersByUserId/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ userId: userId });
        if (orders && orders.length > 0) {
            res.json(orders);
        } else {
            res.status(404).json({ message: "Orders not found" });
        }
    } catch (error) {
        console.error("Error finding orders:", error);
        res.status(500).json({ error: "Failed to find orders" });
    }
});


module.exports = app;