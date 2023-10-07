import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from "./search"
import { RandomWeather } from "./randomweather"
import './App.css'

export function Weathers() {
    const [activeCard, setActiveCard] = useState(1); // Set the initial active card to the middle one
    const [cityName, setCityName] = useState(null)
    const [WeatherDataLoc, setWeatherDataByLoc] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);
    console.log(latitude, longitude);

    const handleValueChange = (childValue) => {

        setCityName(childValue);
    };

    const handleCardClick = (index) => {
        setActiveCard(index);
    };

    const handleLeftClick = () => {
        if (activeCard > 0) {
            setActiveCard(activeCard - 1);
        }
    };

    const handleRightClick = () => {
        if (activeCard < 2) {
            setActiveCard(activeCard + 1);
        }
    };

    if (latitude === null || longitude===null ) {

        setLatitude('8.9966407')
        setLongitude('38.812871')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c7ff880c96ae578bb8724332aa4a93e3`
                );
                setWeatherDataByLoc(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [latitude || longitude]);

    console.log("by loc", WeatherDataLoc);


    
    if (cityName === null ) {

        setCityName('ethiopia')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c7ff880c96ae578bb8724332aa4a93e3`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [cityName]);


    if (!weatherData) {
        return <div>Loading...</div>;
    }

    console.log("the weather loc is ", cityName);
    console.log(weatherData);
    return (
        <>
            <Search onValueChange={handleValueChange} />

            <div className="weatherlist">
                <div className='left' onClick={handleLeftClick}>&lt;</div>
                <div className={`weather1 card ${activeCard === 0 ? 'active' : ''}`} onClick={() => handleCardClick(0)}>
                    <label className='location' >{WeatherDataLoc.name}</label>
                    <div htmlFor="" className="temp">
                        <label htmlFor="" className="termo"></label>{Math.round(WeatherDataLoc.main.temp - 273)}°C
                        <label htmlFor="" className="cloud"></label>
                    </div>
                    <div className="details">
                        <table>
                            <tr>
                                <td>Humidity</td>
                                <td>Visibility</td>
                                <td>Air pressure</td>
                                <td>Wind</td>
                            </tr>
                            <tr>
                                <td>{WeatherDataLoc.main.humidity}%</td>
                                <td>{WeatherDataLoc.visibility / 1000}KM</td>
                                <td>{WeatherDataLoc.main.pressure}hpa</td>
                                <td>{WeatherDataLoc.wind.speed}m/s</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className={`weather2 card ${activeCard === 1 ? 'active' : ''}`} onClick={() => handleCardClick(1)}>
                    <label className='location' >{cityName}</label>
                    <div htmlFor="" className="temp">
                        <label htmlFor="" className="termo"></label>{Math.round(weatherData.main.temp - 273)}°C
                        <label htmlFor="" className="cloud"></label>
                    </div>
                    <div className="details">
                        <table>
                            <tbody>

                                <tr>
                                    <td>Humidity</td>
                                    <td>Visibility</td>
                                    <td>Air pressure</td>
                                    <td>Wind</td>
                                </tr>
                                <tr>
                                    <td>{weatherData.main.humidity}%</td>
                                    <td>{weatherData.visibility / 1000}KM</td>
                                    <td>{weatherData.main.pressure}hpa</td>
                                    <td>{weatherData.wind.speed}m/s</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                </div>
                <div className={`weather3 card ${activeCard === 2 ? 'active' : ''}`} onClick={() => handleCardClick(2)}>
                    <label className='location' >Addis</label>
                    <div htmlFor="" className="temp">
                        <label htmlFor="" className="termo">T</label> 21F
                        <label htmlFor="" className="cloud">c</label>
                    </div>
                    <div className="details">
                        <table>
                            <tr>
                                <td>Humidity</td>
                                <td>Visibility</td>
                                <td>Air pressure</td>
                                <td>Wind</td>
                            </tr>
                            <tr>
                                <td>99%</td>
                                <td>6km</td>
                                <td>101kpa</td>
                                <td>2mph</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='right' onClick={handleRightClick}>&gt;</div>
            </div>
            <RandomWeather />
        </>
    )
}

