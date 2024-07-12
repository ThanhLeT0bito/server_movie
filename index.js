const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");
const orderController = require("./controllers/orderController");
const movieController = require("./controllers/movieController");
const actorController = require("./controllers/actorController");
const seatController = require("./controllers/seat_controller");
const rateMovieController = require("./controllers/rate_movie_controller");
const reviewController = require("./controllers/review_controller");
const cinemaController = require("./controllers/cinema_controller");
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

//actor controller
app.use(actorController);

//seat controller
app.use(seatController);

//rate movie controller
app.use(rateMovieController);

// review controller
app.use(reviewController);

// Cinema controller
app.use(cinemaController);

//
app.use('/images', express.static('/data/user/0/com.example.movie_app_final/cache'));

app.listen(3001, () => {
    console.log("Server is running port 3001");
});
