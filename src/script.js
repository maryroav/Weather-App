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

// function showInFahrenheit() {
//   let fahrenheitDegrees = document.querySelector("#current-temperature");
//   // document.getElementById("current-temperature").innerHTML = fahrenheitDegrees;
//   fahrenheitDegrees.innerHTML = "57";
// }

// function showInCelsius() {
//   let celsiusDegrees = document.querySelector("#current-temperature");
//   celsiusDegrees.innerHTML = "14";
// }

// let fahrenheitTemperature = document.querySelector("#f-degrees");
// fahrenheitTemperature.addEventListener("click", showInFahrenheit);

// let celsiusTemperature = document.querySelector("#c-degrees");
// celsiusTemperature.addEventListener("click", showInCelsius);

// Show weather data

function showWeatherData(response) {
  let cityName = document.querySelector("#current-city-display");
  cityName.innerHTML = `${response.data.name}, `;

  let countryName = document.querySelector("#current-country-display");
  countryName.innerHTML = response.data.sys.country;

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

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

search("Caracas");
