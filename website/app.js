// Personal API Key for OpenWeatherMap API
const endpoint = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zip = ",us&appid=";
const apiKey = "4461cdb55e180f3d54852deaa3cbd84b";
const units = "&units=metric";

// Variable for the date
let d = new Date();
let newDate = d.getMonth()+"."+ d.getDate()+"."+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generate);

/* Function called by event listener */
function generate() {
    const zipcode = document.getElementById("zip").value;
    const zipCode = zipcode.trim();

    getWeather(`${endpoint}${zipCode}${zip}${apiKey}${units}`)
      .then ( (data) => {
        postData("/addWeather", {city: data.name, weather:
                data.weather[0].description, temperature: data.main.temp,
                feelsLike: data.main.feels_like, wind: data.wind.speed});
    })

      .then ( () => updateUI());
}

/* Function to GET Web API Data*/
const getWeather = async (url) => {
    const response = await fetch(url);
    if (response.status != 200) {
        window.alert("Try a valid USA Zip Code, please!");
    }
    try {
        const weather = await response.json();
        return weather;
    } catch (error) {
        console.log("error", error);
    }
}
/* Function to POST data */
const postData = async (url="", data = {}) => {
    const response = await fetch(`http://localhost:8000${url}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
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
        document.getElementById("city").innerHTML = allData.city;
        document.getElementById("date").innerHTML = newDate;
        document.getElementById("temp").innerHTML =
                                      `${allData.temperature} &#176 Celsius`;
        document.getElementById("feels-like").innerHTML =
                                        `${allData.feelsLike} &#176 Celsius`;
        document.getElementById("wind").innerHTML = allData.wind;
        document.getElementById("content").innerHTML = feelings;
        document.getElementById("zip").value = "";
        document.querySelector("#feelings").value = "";
    } catch(error) {
        console.log("error", error);
    }
}
