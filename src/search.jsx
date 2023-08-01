import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Datalist } from "./datalist"
import './App.css';

export function Search({onValueChange}) {
    const [cityInput, setCityInput] = useState('');

    //   console.log(cityInput);
    const handleClick = (e) => {
        // const childValue = 'Hello from child component';
        e.preventDefault();
        // console.log("the search loc is ",cityInput);
        onValueChange(cityInput);
      };
     
    return (
        <form onSubmit={handleClick}>
            <div className="search">
                <input list='options'
                    type="text"
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Search"
                    className='searchtext'
                />
               <Datalist cityInput={cityInput} />
                <button >Search</button>
            </div>
        </form>
    );
}
