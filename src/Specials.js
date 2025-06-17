import React from 'react';
import './Specials.css';
import salad from './assets/greek-salad.jpg';
import bruschetta from './assets/bsruschetta.png';
import dessert from './assets/lemon-dessert.jpg';
import ordericon from './assets/order-icon.svg';

function Specials() {
  return (
    <section className="specials-section">
      <div className="specials-header">
        <h2>This Week‘s Specials!</h2>
        <button className='btn-primary'>Online Menu</button>
      </div>
      <div className="specials-grid">
        <div className="card">
          <img src={salad} alt="Greek Salad" />
          <div className="card-content">
            <h3>Greek Salad <span className="price">$12.99</span></h3>
            <p>Fresh lettuce, olives, feta, and crisp cucumbers with lemon dressing.</p>
            <p className="order">
              <a href="/order" className="order-link">
                Order a delivery <img src={ordericon} alt='delivery-icon' className='order-icon'/></a>
            </p>
          </div>
        </div>
        <div className="card">
          <img src={bruschetta} alt="Bruschetta" />
          <div className="card-content">
            <h3>Bruschetta <span className="price">$5.99</span></h3>
            <p>Toasted bread topped with fresh tomatoes, garlic, and basil.</p>
            <p className="order">
              <a href="/order" className="order-link">
                Order a delivery <img src={ordericon} alt='delivery-icon' className='order-icon'/></a>
            </p>
          </div>
        </div>
        <div className="card">
          <img src={dessert} alt="Lemon Dessert" />
          <div className="card-content">
            <h3>Lemon Dessert <span className="price">$7.99</span></h3>
            <p>Sweet and tart lemon dessert made with authentic ingredients.</p>
            <p className="order">
              <a href="/order" className="order-link">
                Order a delivery <img src={ordericon} alt='delivery-icon' className='order-icon'/></a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Specials;