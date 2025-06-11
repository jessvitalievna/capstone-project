import React from 'react';
import './Specials.css';
import salad from './assets/greek-salad.jpg';
import bruschetta from './assets/bsruschetta.png';
import dessert from './assets/lemon-dessert.jpg';

function Specials() {
  return (
    <section className="specials-section">
      <h2>This Week’s Specials!</h2>
      <div className="specials-grid">
        <div className="card">
          <img src={salad} alt="Greek Salad" />
          <h3>Greek Salad</h3>
          <p>Fresh lettuce, olives, feta, and crisp cucumbers with lemon dressing.</p>
        </div>
        <div className="card">
          <img src={bruschetta} alt="Bruschetta" />
          <h3>Bruschetta</h3>
          <p>Toasted bread topped with fresh tomatoes, garlic, and basil.</p>
        </div>
        <div className="card">
          <img src={dessert} alt="Lemon Dessert" />
          <h3>Lemon Dessert</h3>
          <p>Sweet and tart lemon dessert made with authentic ingredients.</p>
        </div>
      </div>
    </section>
  );
}

export default Specials;