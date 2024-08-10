const container = document.querySelector(".container");
const inputBox = document.querySelector(".input-box");
const empty_box = document.querySelector(".empty-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const resultDiv = document.querySelector(".resultDiv");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  resultDiv.innerHTML = "Fetching Data...";

  const api_key = "38c4b7e62e0f5af4c9247a4f81a21f02";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    resultDiv.innerHTML = "";
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  console.log("run");
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  container.style.backgroundColor = "#fff";

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "img/cloud.png";
      break;
    case "Clear":
      weather_img.src = "img/clear.png";
      break;
    case "Rain":
      weather_img.src = "img/rain.png";
      break;
    case "Mist":
      weather_img.src = "img/mist.png";
      break;
    case "Snow":
      weather_img.src = "img/snow.png";
      break;
  }
  resultDiv.innerHTML = "";
  console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  if (inputBox.value === "") {
     empty_box.innerHTML = "Enter Location";
     setTimeout(function () {
      empty_box.innerHTML = "";
    }, 3000);
    return false;
  } else {
    checkWeather(inputBox.value);
  }
  checkWeather(inputBox.value);
});
