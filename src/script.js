// Last update display

function lastUpdate() {
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
  axios.get(apiUrl).then(displayForecast);
}

function showMoonPhase(response) {
  document.getElementById("moon-phase").src = moonPhaseIcon(
    response.data.days[0].moonphase
  );
}

function moonPhaseIcon(currentMoonPhaseIcon) {
  if (currentMoonPhaseIcon === 0) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-new.svg";
  }

  if (currentMoonPhaseIcon >= 0 && currentMoonPhaseIcon <= 0.25) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-waxing-crescent.svg";
  }

  if (currentMoonPhaseIcon === 0.25) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-first-quarter.svg";
  }

  if (currentMoonPhaseIcon >= 0.25 && currentMoonPhaseIcon <= 0.5) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-waxing-gibbous.svg";
  }

  if (currentMoonPhaseIcon === 0.5) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-full.svg";
  }

  if (currentMoonPhaseIcon >= 0.5 && currentMoonPhaseIcon <= 0.75) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-waning-gibbous.svg";
  }

  if (currentMoonPhaseIcon === 0.75) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-last-quarter.svg";
  }

  if (currentMoonPhaseIcon >= 0.75 && currentMoonPhaseIcon <= 1) {
    return "images/weather-icons-master/design/fill/animation-ready/moon-waning-crescent.svg";
  }

  /*
  0 – new moon -
  0-0.25 – waxing crescent -
  0.25 – first quarter -
  0.25-0.5 – waxing gibbous -
  0.5 – full moon -
  0.5-0.75 – waning gibbous -
  0.75 – last quarter -
  0.75 -1 – waning crescent -
  */
}

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
  currentWind.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} km/h`;

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

  // Moon phase

  let currentDate = cityDate.toLocaleString("af-za", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let moonPhaseApiKey = "ZHCYWG84YEZVL2UVX5JHK63D2";
  let moonPhaseApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${response.data.name}/${currentDate}?unitGroup=us&key=${moonPhaseApiKey}&include=days&elements=moonphase`;
  axios.get(moonPhaseApiUrl).then(showMoonPhase);
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

  // Moon phase

  /* let moonPhaseApiKey = "ZHCYWG84YEZVL2UVX5JHK63D2";
  let moonPhaseApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/2022-09-25?unitGroup=us&key=${moonPhaseApiKey}&include=days&elements=moonphase`;
  console.log(moonPhaseApiUrl);
  axios.get(moonPhaseApiUrl).then(showMoonPhase); */
}

function currentCityDisplay(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

var today = new Date(); // Current date, global variable
var cityDate = new Date(); // City date, global variable

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("submit", currentCityDisplay);

search("Marsella");
