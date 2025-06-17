import React from 'react';
import './About.css';
import ownersImg from './assets/owners.jpg';

function About() {
  return (
    <section className="about-section">
        <div className='container about-container'>
          <div className="about-text">
            <h2>About Little Lemon</h2>
            <p>
              Little Lemon is a family-owned Mediterranean restaurant focused on
              bringing authentic flavors to the heart of Chicago. Our dishes are made
              with fresh, locally sourced ingredients and a passion for tradition.
            </p>
            <p>
              Whether you're joining us for a casual lunch or a special dinner, our
              warm atmosphere and delicious food will make you feel at home.
            </p>
          </div>
          <div className="about-image">
            <img src={ownersImg} alt="Owners" className="owners-img" />
            <img src={require('./assets/restaurant.jpg')} alt="Restaurant" className="restaurant-img" />
          </div>
        </div>
    </section>
  );
}

export default About;