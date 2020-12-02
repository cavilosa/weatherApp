// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

const port = 8000;
// Spin up the server
// Callback to debug
const sever = app.listen(port, listening);

function listening(){
    console.log(`running on local server ${port}`);
}

// Initialize all route with a callback function

const weatherData = [];

app.get("/all", getData);
// Callback function to complete GET '/all'

function getData (req, res) {
    res.send(weatherData);
}


// Post Route

app.post("/addWeather", addWeather);

function addWeather(req, res){
    console.log(req.body);
    /*
    newEntry = {
        city: req.body.name,
        weather: req.body.weather[2],
        temperature: req.body.main[0],
        fellsLike: req.body.main[1],
        wind: req.body.wind[0]
    }
    weatherData.push(newEntry);
    res.send(weatherData);
    console.log(weatherData);*/
}

app.get("/all", getData);

function getData(req, res) {
    res.send(weatherData);
}
