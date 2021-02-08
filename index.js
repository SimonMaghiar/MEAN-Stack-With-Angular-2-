const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
//Load the config 
dotenv.config({path: './config/config.env'});

const app = express();
app.use(express.json());

connectDB();

app.use(express.static(__dirname + '/client/dist/client'));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
  })
  
app.listen(process.env.PORT || 3000, () => {
    console.log('Listenng on port 8080');
}) 