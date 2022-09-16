// Last update display

function lastUpdate() {
  // let actualDate = document.getElementById("actual-date");
  /* let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();

  console.log(getMoonPhase(year, month, day)); */

  let lastTimeUpdated = document.getElementById("actual-date");
  convertTime = cityDate.toLocaleString("en-us", {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  lastTimeUpdated.innerHTML = `Last update: ${convertTime}`;
}

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
    if (index > 0 && index < 6) {
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

  // Timezone offset

  let cityOffset = response.data.timezone / 3600;
  let userOffset = today.getTimezoneOffset() / 60;
  let diffHours = cityOffset + userOffset;
  cityDate.setTime(today.getTime() + diffHours * 60 * 60 * 1000);

  // Sunrise time

  let sunriseUnix = response.data.sys.sunrise;
  sunriseTime = new Date(sunriseUnix * 1000 + diffHours * 60 * 60 * 1000);

  sunrise = sunriseTime.toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("sunrise").innerHTML = `${sunrise}`;
  console.log(response.data.sys);

  // Sunset time

  let sunsetUnix = response.data.sys.sunset;
  sunsetTime = new Date(sunsetUnix * 1000 + diffHours * 60 * 60 * 1000);

  sunset = sunsetTime.toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("sunset").innerHTML = `${sunset}`;

  getForecast(response.data.coord);

  lastUpdate();
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

function getMoonPhase(year, month, day) {
  var c = (e = jd = b = 0);

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;

  c = 365.25 * year;

  e = 30.6 * month;

  jd = c + e + day - 694039.09; //jd is total days elapsed

  jd /= 29.5305882; //divide by the moon cycle

  b = parseInt(jd); //int(jd) -> b, take integer part of jd

  jd -= b; //subtract integer part to leave fractional part of original jd

  b = Math.round(jd * 8); //scale fraction from 0-8 and round

  if (b >= 8) {
    b = 0; //0 and 8 are the same so turn 8 into 0
  }

  // 0 => New Moon
  // 1 => Waxing Crescent Moon
  // 2 => Quarter Moon
  // 3 => Waxing Gibbous Moon
  // 4 => Full Moon
  // 5 => Waning Gibbous Moon
  // 6 => Last Quarter Moon
  // 7 => Waning Crescent Moon

  return b;
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
  showInCelsius(event);
}

var today = new Date(); // Current date, global variable
var cityDate = new Date(); // City date, global variable

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("submit", currentCityDisplay);

let celsiusTemperature = null;

search("Marsella");

/* Astronomy API

Application ID: 272edff2-849b-4006-ac50-d8cff575e5a6

Application secret: a71e7b878d760c64be354008d520e0c1b2989ec65add483830e8acaba03dd51a95f903095783e4cb60d9174305fa6c83442746a8d9aec4c7282a04cd8d24aa727c7c6ba091f2436e85c1adeac881df11754cc4c7f7bd9c8a42dcccc8a1b9798eb516139fdcafdd93b80e3925d574cc12

*/
