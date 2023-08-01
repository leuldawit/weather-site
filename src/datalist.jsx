import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export function Datalist({ cityInput }) {
    
    const [cityNames, setCityNames] = useState([]);
    useEffect(() => {
        if (cityInput === '') return;

        axios
            .get('http://api.geonames.org/searchJSON', {
                params: {
                    name_startsWith: cityInput,
                    maxRows: 5,
                    featureCode: 'PCLI',
                    username: 'leuldz', // Replace with your GeoNames username

                },
            })
            .then((response) => {
                const cities = response.data.geonames.map((city) => city.name);
                setCityNames(cities);
            })
            .catch((error) => {
                console.error('Error fetching city names:', error);
            });
    }, [cityInput]);

    // console.log(cityNames);

    return (

        <datalist id="options">
            {cityNames.map((option, index) => (
                <option key={index} value={option} />
            ))}
        </datalist>

    );
}
