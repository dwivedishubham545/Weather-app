const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_image = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.desc');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const sunRise = document.getElementById('sun-rise');
const sunSet = document.getElementById('sun-set');
let cityName = document.getElementById('cityName');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.flex-item');

async function checkWeather(city){
    const api_key = "7d155b48d3b86c2d4f2fadd6e95861d3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }
    else{
        location_not_found.style.display = "none";
        weather_body.style.display = "none";
    }
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;
    const sunrise = `${weather_data.sys.sunrise}`;
    const date = new Date(sunrise*1000);
    let time = date.toLocaleTimeString();
    sunRise.innerHTML = time;
    const sunset = `${weather_data.sys.sunset}`;
    const date1 = new Date(sunset*1000);
    let time1 = date1.toLocaleTimeString();
    sunSet.innerHTML = time1;
    cityName.innerHTML = city;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_image.src = "images/cloud.png";
            break;
        case 'Clear':
            weather_image.src = "images/clear.png";
            break;
        case 'Rain':
            weather_image.src = "images/rain.png";
            break;
        case 'Mist':
            weather_image.src = "images/mist.png";
            break;
        case 'Snow':
            weather_image.src = "images/snow.png";
            break;
    }
    console.log(weather_data)
}
searchBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    checkWeather(inputBox.value);
    clearSearchHistory();
});

function clearSearchHistory(){
var searchBox = document.querySelector(".input-box");
var searchHistory = searchBox.value;
searchBox.value = "";
}
  
