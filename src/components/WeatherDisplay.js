import React, { useEffect, useState } from 'react';

const WeatherDisplay = ({ data, forecast, searchInitiated }) => {
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (searchInitiated) {
            if (!data) {
                setErrorMessage('No data received. Please check the city name.');
            } else {
                setErrorMessage('');
            }
        }
    }, [data, searchInitiated]);

    if (errorMessage) {
        return (
            <div className="weather-display">
                <h1>Error</h1>
                <p>{errorMessage}</p>
            </div>
        );
    }

    if (!data || !forecast) {
        return null;
    }

    const groupByDay = (forecast) => {
        if (!forecast || !Array.isArray(forecast)) {
            console.error('Forecast data is null, undefined, or not an array');
            return {};
        }

        const days = {};
        forecast.forEach(entry => {
            const date = new Date(entry.dt * 1000).toLocaleDateString();
            if (!days[date]) {
                days[date] = [];
            }
            days[date].push(entry);
        });
        return days;
    };

    const forecastByDay = groupByDay(forecast);

    return (
        <div className="weather-display">
            <h1>Weather in {data.name}</h1>
            <div className="weather-info">
                <p><strong>Temperature:</strong> {data.main.temp} °C</p>
                <p><strong>Feels like:</strong> {data.main.feels_like} °C</p>
                <p><strong>Humidity:</strong> {data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> {data.wind.speed} m/s</p>
                <p><strong>Pressure:</strong> {data.main.pressure} hPa</p>
            </div>
            <h2>5-Day Forecast</h2>
            <div className="forecast">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Temperature (°C)</th>
                                <th>Weather</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(forecastByDay).map((date, index) => (
                                forecastByDay[date].map((entry, idx) => (
                                    <tr key={`${index}-${idx}`}>
                                        {idx === 0 && <td rowSpan={forecastByDay[date].length}>{date}</td>}
                                        <td>{new Date(entry.dt * 1000).toLocaleTimeString()}</td>
                                        <td>{entry.main.temp} °C</td>
                                        <td>{entry.weather[0].description}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
