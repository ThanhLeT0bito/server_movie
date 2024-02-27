const express = require("express");
const mongoose = require("mongoose");

//const link = "mongodb+srv://letienthanh:EpAlMKm332Cs2Kvi@cluster0.4qsvsqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const link = "mongodb+srv://letienthanh:EpAlMKm332Cs2Kvi@cluster0.4qsvsqj.mongodb.net/movie";
const linkLocal = "mongodb://localhost:27017/customer";
const app = express();

// Define the UserSchema and UserModel here
const UserSchema = mongoose.Schema({
    name: String,
});

const UserModel = mongoose.model("users", UserSchema);

mongoose.connect(link)
    .then(() => {
        console.log("successfully connect");

        const newUser = UserModel({
            name: 'Quoc 11',
        });
        return newUser.save();
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => res.json({ answer: 42 }));

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then((users) => {
        console.log(users);
        res.json(users);
    })
    .catch((err) => {
        res.status(400).json({err: 'ERROR'});
    });
});

app.listen(3001, () => {
    console.log("Server is running port 3001");
});
