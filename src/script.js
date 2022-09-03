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

// Show weather data

function showWeatherData(response) {
  let cityName = document.querySelector("#current-city-display");
  cityName.innerHTML = `${response.data.name}, `;

  let countryName = document.querySelector("#current-country-display");
  countryName.innerHTML = response.data.sys.country;

  let temperatureElement = document.querySelector("#current-temperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = response.data.weather[0].main;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;

  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `${response.data.wind.speed} m/s`;

  // let sunriseTime = document.querySelector("#sunrise");
  // sunriseTime.innerHTML =
  // let sunsetTime = document.querySelector("#sunset");

  console.log(response);
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

search("Caracas");
