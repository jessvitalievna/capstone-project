import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const reviews = [
    {
      name: 'Anna M.',
      text: 'Absolutely loved the food and the service. The lemon dessert is a must-try!',
    },
    {
      name: 'Carlos R.',
      text: 'A true taste of the Mediterranean. Cozy atmosphere and fresh ingredients.',
    },
    {
      name: 'Sophie L.',
      text: 'Came here for dinner and ended up booking again for the next day. So good!',
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">“{review.text}”</p>
              <p className="testimonial-name">– {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;