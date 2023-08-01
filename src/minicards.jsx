import React from 'react';

const Minicards = ({ location, temperature, description }) => {
  return (
    <div className="hour">
      <h2>{location}</h2>
      <p>{temperature}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default Minicards;
