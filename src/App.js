import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            const city = event.target.value;
            const apiKey = '0f8c88146a435b8db9d6af1cacbbc02a'; // Replace with your actual API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const response = await axios.get(url);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    };

    return (
        <div className="App">
            <SearchBar onSearch={handleSearch} />
            <WeatherDisplay data={weatherData} />
        </div>
    );
};

export default App;