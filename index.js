const express = require("express");
const mongoose = require("mongoose");

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
const { getUsers, insertUser, deleteUser, updateUser } = require('./controllers/userController');
app.get("/getUsers", getUsers);
app.post("/insertUser", insertUser);
app.delete("/deleteUser/:id", deleteUser);
app.put("/updateUser/:id", updateUser);

app.listen(3001, () => {
    console.log("Server is running port 3001");
});
