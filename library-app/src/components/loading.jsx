import React from 'react';
import './LoadingComponent.css';

const LoadingComponent = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-container">
        <div className="logo">
          <div className="logo-icon"></div>
        </div>
        
        <div className="spinner"></div>
        
        <div className="loading-text">
          Loading<span className="dots">...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;