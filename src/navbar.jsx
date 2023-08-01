import { useState } from 'react'

import './App.css'

export function Navbar() {

  return (
    <>
   <div className="navbar">
    <div className="logo">logo</div>
    <div className="navitems">
        <ul>
            <li>
                <a href="">Today</a>
            </li>
            <li>
               <a href=""> Tomorrow</a>
            </li>
            <li>
                <a href="">Monthly forcast</a>
            </li>
        </ul>
    </div>
   </div>
    
    </>
  )
}

