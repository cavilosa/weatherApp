// Setup empty JS object to act as endpoint for all routes
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

let projectData = {};

// Post Route
app.post("/addWeather", addWeather);

function addWeather(req, res){
    newEntry = {
        city: req.body.city,
        weather: req.body.weather,
        temperature: req.body.temperature,
        feelsLike: req.body.feelsLike,
        wind: req.body.wind
    }
    projectData = newEntry;
}



app.get("/all", getData);

// Callback function to complete GET '/all'
function getData (req, res) {
    res.send(projectData);
}
