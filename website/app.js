// Personal API Key for OpenWeatherMap API
const endpoint = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zip = ",us&appid=";
const apiKey = "4461cdb55e180f3d54852deaa3cbd84b";

// Event listener to add function to existing HTML DOM element



let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", generate);

/* Function called by event listener */
function generate() {
    const zipcode = document.getElementById("zip").value;
    const zipCode = zipcode.trim();
    console.log(zipCode);
    getWeather(`${endpoint}${zipCode}${zip}${apiKey}`)
      .then ( (data) => {
        //console.log("data from then", data);
        postData("/addWeather", {city: data.name, weather: data.weather[0].description,
                temperature: data.main.temp, feelsLike: data.main.feels_like,
                wind: data.wind.speed});
    })

      .then ( () => updateUI());
}

/* Function to GET Web API Data*/
const getWeather = async (url) => {
    console.log("the url is", url);
    const response = await fetch(url);
    //console.log(url);
    try {
        const weather = await response.json();
        //console.log(weather.weather[0].description);
        return weather;
    } catch (error) {
        console.log("error", error);
    }
}
/* Function to POST data */
const postData = async (url="", data = {}) => {
    //console.log(data);
    const response = await fetch(`http://localhost:8000${url}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            //'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log("newData done");
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const feelings = document.querySelector("#feelings").value;
    const request = await fetch("http://localhost:8000/all");
    try {
        const allData = await request.json();
        document.getElementById("city").innerHTML = allData[0].city;
        document.getElementById("date").innerHTML = newDate;
        document.getElementById("temp").innerHTML = `${allData[0].temperature} &#176 Kelvin`;
        document.getElementById("feels-like").innerHTML = `${allData[0].feelsLike} &#176 Kelvin`;
        document.getElementById("wind").innerHTML = allData[0].wind;
        document.getElementById("content").innerHTML = feelings;
    } catch(error) {
        console.log("error", error);
    }
}
