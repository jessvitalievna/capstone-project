import React, { useState } from 'react';
import './BookingForm.css';

function BookingForm({ onSubmit, availableTimes, dispatchDate }) {
  const [date, setDate] = useState(() => {
  const today = new Date().toISOString().split('T')[0];
  return today;
});
  const [guests, setGuests] = useState(1);
  const occasions = ['Birthday', 'Anniversary'];
  const [occasion, setOccasion] = useState(occasions[0]);
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time, guests, occasion });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        name="date"
        id="res-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <input
        type="time"
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        list="time-options"
        required
      />
      <datalist id="time-options">
        {availableTimes.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        required
      >
        {occasions.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <button type="submit" className='btn-primary'>Submit reservation</button>
    </form>
  );
}

export default BookingForm;