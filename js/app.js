const apiKey = "0d260a35bae7c5a83f603d8b622956d1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const cityInput = document.getElementById("city");
const button = document.getElementById("btn");
const message = document.getElementById("message");

// Get weather from API
async function getWeather(query) {
    message.textContent = "Loading...";

    try {
        const response = await fetch(apiUrl + query + "&appid=" + apiKey);
        const data = await response.json();

        if (!response.ok) {
            message.textContent = "Error: " + data.message;
            return;
        }

        // Show data on the page
        document.getElementById("name").textContent = data.name;
        document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("humidity").textContent = data.main.humidity + "%";
        document.getElementById("wind").textContent = (data.wind.speed * 3.6).toFixed(1) + " km/h";
        document.getElementById("icon").src =
            "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

        message.textContent = "";

    } catch (error) {
        message.textContent = "Could not load weather.";
    }
}

// Search by city name
function searchCity() {
    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    getWeather("&q=" + city);
}

// Search by my location
function getMyLocation() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            getWeather("&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude);
        },
        function () {
            // Location blocked, so show Colombo
            getWeather("&q=Colombo");
        }
    );
}

button.addEventListener("click", searchCity);

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCity();
    }
});

getMyLocation();