import React from 'react';
import './style.css';
import Ripples from './Ripples.gif';

const Loading = () => {
  return (
    <div className="loader">
      <div className="container">
        <img src={Ripples} alt="loading..." />
      </div>
    </div>
  );
};

export default Loading;
