import React from 'react';
import './Hero.css';
import heroImage from './assets/hero-img.png';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>We serve traditional Mediterranean dishes with a modern twist.</p>
            <button className='btn-primary' onClick={() => navigate('booking')}>
              Reserve a Table
            </button>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Delicious Mediterranean dish" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;