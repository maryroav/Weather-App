// Current date display

let today = new Date();

let seconds = today.getSeconds();

let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let date = today.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[today.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[today.getMonth()];

let year = today.getFullYear();

let currentDate = `${hours}:${minutes}, ${day}, ${month} ${date}, ${year}`;

document.getElementById("actual-date").innerHTML = currentDate;

// Forecast

function forecastFormatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      console.log(forecastDay);
      forecastHTML =
        forecastHTML +
        `<div class="col-6">
        <div class="prediction-day">${forecastFormatDate(forecastDay.dt)}</div> 
          <div class="weather-prediction">
            <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span>
            <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
          </div>
      </div>
      
      <div class="col-6">
      <img src="${weatherIcon(
        forecastDay.weather[0].icon
      )}" class="prediction-img" id="daily-forecast-icon"></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// Celsius and fahrenheit temperature

function showInFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  // Remove the active class for the celsius degrees
  celsiusDegrees.classList.remove("active");
  // Then, add the active class to the fahrenheit degrees
  fahrenheitDegrees.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showInCelsius(event) {
  event.preventDefault();
  fahrenheitDegrees.classList.remove("active");
  celsiusDegrees.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitDegrees = document.querySelector("#f-degrees");
fahrenheitDegrees.addEventListener("click", showInFahrenheit);

let celsiusDegrees = document.querySelector("#c-degrees");
celsiusDegrees.addEventListener("click", showInCelsius);

// Show current weather data

function showWeatherData(response) {
  console.log(response.data);
  let cityName = document.querySelector("#current-city-display");
  cityName.innerHTML = `${response.data.name}, `;

  let countryName = document.querySelector("#current-country-display");
  countryName.innerHTML = response.data.sys.country;

  document.getElementById("actual-weather").src = weatherIcon(
    response.data.weather[0].icon
  ); // Weather icon

  let temperatureElement = document.querySelector("#current-temperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = response.data.weather[0].description;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;

  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `${response.data.wind.speed} m/s`;

  // Sunrise time

  let sunriseUnix = response.data.sys.sunrise;
  sunriseTime = new Date(sunriseUnix * 1000);

  sunriseHour = sunriseTime.getHours();
  if (sunriseHour < 10) {
    sunriseHour = `0${sunriseHour}`;
  }

  sunriseMinutes = sunriseTime.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`;
  }

  let sunrise = `${sunriseHour}:${sunriseMinutes}`;

  document.getElementById("sunrise").innerHTML = `${sunrise}`;

  // Sunset time

  let sunsetUnix = response.data.sys.sunset;
  sunsetTime = new Date(sunsetUnix * 1000);

  sunsetHour = sunsetTime.getHours();
  if (sunsetHour < 10) {
    sunsetHour = `0${sunsetHour}`;
  }

  sunsetMinutes = sunsetTime.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }

  let sunset = `${sunsetHour}:${sunsetMinutes}`;

  document.getElementById("sunset").innerHTML = `${sunset}`;

  getForecast(response.data.coord);
}

function weatherIcon(iconChoice) {
  if (iconChoice === "01d") {
    return "images/weather-icons-master/design/fill/animation-ready/clear-day.svg";
  }

  if (iconChoice === "01n") {
    return "images/weather-icons-master/design/fill/animation-ready/clear-night.svg";
  }

  if (iconChoice === "02d") {
    return "images/weather-icons-master/design/fill/animation-ready/partly-cloudy-day.svg";
  }

  if (iconChoice === "02n") {
    return "images/weather-icons-master/design/fill/animation-ready/partly-cloudy-night.svg";
  }

  if (iconChoice === "03d" || iconChoice === "03n") {
    return "images/weather-icons-master/design/fill/animation-ready/cloudy.svg";
  }

  if (iconChoice === "04d" || iconChoice === "04n") {
    return "images/weather-icons-master/design/fill/animation-ready/overcast.svg";
  }

  if (iconChoice === "09d" || iconChoice === "09n") {
    return "images/weather-icons-master/design/fill/animation-ready/drizzle.svg";
  }

  if (iconChoice === "10d" || iconChoice === "10n") {
    return "images/weather-icons-master/design/fill/animation-ready/rain.svg";
  }

  if (iconChoice === "11d" || iconChoice === "11n") {
    return "images/weather-icons-master/design/fill/animation-ready/thunderstorms.svg";
  }

  if (iconChoice === "13d" || iconChoice === "13n") {
    return "images/weather-icons-master/design/fill/animation-ready/snow.svg";
  }

  if (iconChoice === "50d" || iconChoice === "50n") {
    return "images/weather-icons-master/design/fill/animation-ready/mist.svg";
  }
}

function search(city) {
  let units = "metric";
  let apiKey = "ba00850463194774eab1016f22d45ed5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherData);
}

function currentCityDisplay(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("submit", currentCityDisplay);

let celsiusTemperature = null;

search("Marsella");
