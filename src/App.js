import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            setSearchInitiated(true);
            const city = event.target.value;
            const apiKey = '2f5b5d158a5045a556c35a2d057a4b96'; // Provided API key
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const weatherResponse = await axios.get(weatherUrl);
                setWeatherData(weatherResponse.data);

                const forecastResponse = await axios.get(forecastUrl);
                setForecastData(forecastResponse.data.list);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage('City not found. Please check the city name.');
                setWeatherData(null);
                setForecastData(null);
            }
        }
    };

    return (
        <div className="App">
            <h1>Weather Report For the city of your choice</h1>
            <SearchBar onSearch={handleSearch} />
            <WeatherDisplay 
                data={weatherData} 
                forecast={forecastData} 
                searchInitiated={searchInitiated} 
                errorMessage={errorMessage} 
            />
        </div>
    );
};

export default App;
