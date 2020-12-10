import React from 'react';
import './style.css';
import loader from './loader.gif';

const Loading = () => {
  return (
    <div className="loader">
      <div className="container">
        <img src={loader} alt="loading..." />
      </div>
    </div>
  );
};

export default Loading;
