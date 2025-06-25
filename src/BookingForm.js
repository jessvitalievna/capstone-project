import React, { useState } from 'react';
import './BookingForm.css';

function BookingForm({ onSubmit, availableTimes, dispatchDate }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const occasions = ['Birthday', 'Anniversary'];
  const [occasion, setOccasion] = useState(occasions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time, guests, occasion });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={(e) => {
          const selectedDate = e.target.value;
          setDate(selectedDate);
          dispatchDate(selectedDate);
        }}
      />

      <label htmlFor="res-time">Choose time</label>
      <input
        type="time"
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        list="time-options"
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
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
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