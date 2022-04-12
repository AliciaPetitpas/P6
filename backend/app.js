//imp. express, mongoose, path
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const path = require('path');
require('dotenv').config()

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//créer app express
const app = express();

//connexion mongoose avec protection .env
mongoose
    .connect(
        `${process.env.DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Failed to connect to MongoDB"));

//Paramètres Helmet
// Sets "Cross-Origin-Resource-Policy: cross-origin"
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());

//path images
app.use('/images', express.static(path.join(__dirname, 'images')))

//routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

//export app
module.exports = app;