const express = require('express');
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require("./api/auth/model");
const session = require("express-session");
const cors = require("cors");


mongoose.connect("mongodb://localhost:27017/Tinder", async () => {
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    // Header CORS
    server.use(cors({
        origin: ['http://localhost:3000'],
        credentials:true
    }));
    //Session
    server.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true }
    }))
    //Router
    server.use("/auth", require("./api/auth/route"));
    server.listen(3001, () => {
        console.log("Server listen on port 3001");
    })
})