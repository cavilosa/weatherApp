// Personal API Key for OpenWeatherMap API
const endpoint = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zip = ",us&appid=";
const apiKey = "4461cdb55e180f3d54852deaa3cbd84b";

// Event listener to add function to existing HTML DOM element

const feelings = document.querySelector("#mood");

document.getElementById("generate").addEventListener("click", generate);

/* Function called by event listener */
function generate() {
    const zipCode = document.getElementById("zipcode").value;
    getWeather(`https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=${apiKey}`)
    .then ( function (data) {
        console.log("data from then", data);
        postData("/addWeather", {city: data.name, weather: data.weather[0].description,
                temperature: data.main.temp, fellsLike: data.main.feels_like,
                wind: data.wind.speed});
    })
}

/* Function to GET Web API Data*/
const getWeather = async (url) => {
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
    console.log(data);
    const response = await fetch(`http://localhost:8000${url}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application.json"
        },
        body: JSON.stringify(data)
    });
    try {
        console.log("response", response);
        const newData = await response.json();
        console.log("newdata", newData);
        //return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
