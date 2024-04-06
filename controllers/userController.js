const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Define the UserSchema and UserModel
const UserSchema = mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    urlImage : String
});

const UserModel = mongoose.model("users", UserSchema);

// Endpoint to get all users
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(400).json({ err: 'ERROR' });
    }
};

// Endpoint to insert a new user
const insertUser = async (req, res) => {
    try {
        const { name, phone, mail, urlImage } = req.body;
        if (name == null || name == '')
            name = '';
        if (mail == null || mail == '')
            mail = '';

        console.log(name + ":" + phone + ":" + mail + ":" + urlImage)
        const newUser = new UserModel({
            name: name,
            phone: phone,
            mail: mail,
            urlImage: urlImage
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Failed to insert user" });
    }
};

// Endpoint to delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await UserModel.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};

// Endpoint to update a user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, urlImage } = req.body;
        if ((name != null || name != '') &&(urlImage == null || urlImage == ''))
            await UserModel.findByIdAndUpdate(userId, { name });
        else
            await UserModel.findByIdAndUpdate(userId, {urlImage });
        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

module.exports = { getUsers, insertUser, deleteUser, updateUser };
