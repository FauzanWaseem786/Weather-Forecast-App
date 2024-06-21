import React from 'react';

const WeatherDisplay = ({ data, forecast }) => {
    if (!data) return null;

    const groupByDay = (forecast) => {
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
    );
};

export default WeatherDisplay;
