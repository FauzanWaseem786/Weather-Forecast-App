import React from 'react';

const WeatherDisplay = ({ data }) => {
    if (!data) return null;

    return (
        <div className="weather-display">
            <h1>Weather in {data.name}</h1>
            <div className="weather-info">
                <p><strong>Temperature:</strong> {data.main.temp} °C</p>
                <p><strong>Feels like:</strong> {data.main.feels_like} °C</p>
                <p><strong>Humidity:</strong> {data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> {data.wind.speed} m/s</p>
                <p><strong>Pressure:</strong> {data.main.pressure} hPa</p>
                {/* Add more weather details as needed */}
            </div>
        </div>
    );
};

export default WeatherDisplay;