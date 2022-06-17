import { API_KEY, ERR_MSG, LOADING_MSG } from "../constants/constants.js";

/**
 * Function to handle the button click.
 */
function onBtnClick() {
  const btn = document.getElementById("submitBtn");
  btn.addEventListener("click", getCityName);
}

/**
 * Function to get city name from input field.
 */
function getCityName() {
  let cityName = document.getElementById("cityName").value;
  fetchWeatherfromApi(cityName);
}

/**
 * Function to fetch weather details form api.
 *
 * @param {string} city
 */
async function fetchWeatherfromApi(city) {
  const key = API_KEY.KEY_ONE;

  emptyInnerHtml();
  document.getElementById("temp").innerHTML = LOADING_MSG.LOADING;

  await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      key
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      setWeatherDetails(data);
    })
    .catch(function () {
      emptyInnerHtml();
      document.getElementById("temp").innerHTML = ERR_MSG.ERROR;
    });
}

/**
 * Function to set Weather Details.
 * @param {object} data
 */
function setWeatherDetails(data) {
  getIcon(data.weather[0].icon);
  let celcius = Math.round(parseFloat(data.main.temp) - 273.15);
  let description = data.weather[0].description;

  document.getElementById("description").innerHTML =
    data.weather[0].description;
  document.getElementById("temp").innerHTML = celcius + " °C";
  document.getElementById("location").innerHTML = data.name;

  if (description.indexOf("rain") > 0) {
    document.body.className = "rainy";
  } else if (description.indexOf("cloud") > 0) {
    document.body.className = "cloudy";
  } else if (description.indexOf("sunny") > 0) {
    document.body.className = "sunny";
  }
}

/**
 * Function to get icon form the code.
 *
 * @param {string} icon
 */
function getIcon(icon) {
  const img = document.createElement("img");
  img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.getElementById("icon").appendChild(img);
}

/**
 * Function to clear the innerHtml.
 */
function emptyInnerHtml() {
  document.getElementById("icon").innerHTML = "";
  document.getElementById("location").innerHTML = "";
  document.getElementById("description").innerHTML = "";
}

onBtnClick();
