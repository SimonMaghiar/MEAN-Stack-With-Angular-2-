const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

//Load the config 
dotenv.config({path: './config/config.env'});

//Routes
const authentication_routes = require('./routes/authentication');


const app = express();
app.use(express.json());

connectDB();

// Provide Static Directory for FrontEnd (MIDLLEWARES)
app.use(express.static(__dirname + '/client/dist/client'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:4200'
}));



//Routes
app.use('/authentication', authentication_routes);


//Connect server to Angular 2 Index.html
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
})
  
// Start Server: Listen on port 8080
app.listen(process.env.PORT || 3000, () => {
    console.log('Listenng on port 8080');
}) 