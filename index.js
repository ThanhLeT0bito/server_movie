const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");
const orderController = require("./controllers/orderController");
const movieController = require("./controllers/movieController");
//const link = "mongodb+srv://letienthanh:EpAlMKm332Cs2Kvi@cluster0.4qsvsqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const link = "mongodb+srv://letienthanh:EpAlMKm332Cs2Kvi@cluster0.4qsvsqj.mongodb.net/movie";

const app = express();


mongoose.connect(link)
    .then(() => {
        console.log("successfully connect");
    })
    .catch((err) => {
        console.log(err);
    });

// Middleware for parsing JSON data from requests
app.use(express.json());

app.get('/', (req, res) => res.json({ answer: 42 }));

// user controller
app.use(userController);

// order controller
app.use(orderController);

//movie controller
app.use(movieController);

app.listen(3001, () => {
    console.log("Server is running port 3001");
});
