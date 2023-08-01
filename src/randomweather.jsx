import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Minicards from './minicards';

export const RandomWeather = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const locations = ['London', 'New York', 'Tokyo', 'Sydney', 'Paris'];
            const apiKey = 'c7ff880c96ae578bb8724332aa4a93e3';

            const requests = locations.map(async (location) => {
                console.log('aaaaaa',location);
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c7ff880c96ae578bb8724332aa4a93e3`;
                const response = await axios.get(url);
                return response.data;
            });

            const data = await Promise.all(requests);
            setWeatherData(data);
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="App">
            <h1>Weather App</h1>
            <div className='hourly'>
                {weatherData.map((data, index) => (
                    <Minicards
                        key={index}
                        location={data.name}
                        temperature={data.main.temp}
                        description={data.weather[0].description}
                    />
                ))}
            </div>
        </div>
    );
};

