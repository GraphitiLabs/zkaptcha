// GifButton.js
import React, { useState } from 'react';
import './GifButton.css';

const GifButton = ({ gifSrc, staticSrc, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button className="gif-button" onClick={handleClick}>
      <img src={isPlaying ? gifSrc : staticSrc} alt={alt} />
    </button>
  );
};

export default GifButton;
