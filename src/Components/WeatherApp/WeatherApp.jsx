import './WeatherApp.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import { useState } from 'react';
const WeatherApp = () => {

    const[weathericon,setWeatherIcon] = useState(cloud_icon);

    let api_key = "b02436fc16db656a2ef2afb983b76636";
    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === ""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
        let data = await fetch(url);
        let response = await data.json();
        console.log('data',response);

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind  = document.getElementsByClassName('wind-rate');
        const temprature  = document.getElementsByClassName('weather-temp');
        const location  = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = response.main.humidity+' %';
        wind[0].innerHTML = Math.floor(response.wind.speed)+' km/h';
        temprature[0].innerHTML = Math.floor((response.main.temp - 273.15))+'°C';
        location[0].innerHTML = response.name;

        if(response.weather[0].icon==='01d' || response.weather[0].icon==='01n'){
            setWeatherIcon(clear_icon);
        }
        else if(response.weather[0].icon==='02d' || response.weather[0].icon==='02n'){
            setWeatherIcon(cloud_icon)
        }
        else if(response.weather[0].icon==='03d' || response.weather[0].icon==='03n'){
            setWeatherIcon(drizzle_icon)
        }
        else if(response.weather[0].icon==='04d' || response.weather[0].icon==='04n'){
            setWeatherIcon(drizzle_icon)
        }
        else if(response.weather[0].icon==='09d' || response.weather[0].icon==='09n'){
            setWeatherIcon(rain_icon)
        }
        else if(response.weather[0].icon==='10d' || response.weather[0].icon==='10n'){
            setWeatherIcon(rain_icon)
        }
        else if(response.weather[0].icon==='13d' || response.weather[0].icon==='13n'){
            setWeatherIcon(snow_icon)
        }
        else{
            setWeatherIcon(clear_icon)
        }
    }
    return(
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search_icon} alt="search_icon"/>
                </div>
            </div>
            <div className="weather-image">
                <img src={weathericon} alt="cloud_icon" />
            </div>
            <div className='weather-temp'>24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity-icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind-icon" />
                    <div className="data">
                        <div className="wind-rate">18km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherApp;