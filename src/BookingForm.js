import React, { useState, useEffect } from 'react';
import './BookingForm.css';

function BookingForm({ onSubmit, availableTimes }) {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState();
  const occasions = ['Birthday', 'Anniversary', 'Wedding', 'Business Meeting', 'Other'];
  const [occasion, setOccasion] = useState(occasions[0]);
  const [time, setTime] = useState('');
  const normalizeTime = (raw) => {
    // parse HH:mm, convert to minutes, round:
    const [h, m] = raw.split(':').map(Number);
    const total = h * 60 + m;
    const rounded = Math.round(total / 30) * 30;
    const hh = String(Math.floor(rounded / 60)).padStart(2, '0');
    const mm = String(rounded % 60).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const [formValid, setFormValid] = useState(false);
  const [touched, setTouched] = useState({
    date: false,
    time: false,
    guests: false,
  });

const todayStr = new Date().toISOString().split('T')[0];
const maxDateStr = "2025-12-31";

const errors = {
  date:
    !date
      ? 'Please select a date'
      : date < todayStr
        ? "Date can't be in the past"
        : date > maxDateStr
          ? `Date must be on or before ${maxDateStr}`
          : '',
  time:
    time.trim() === ''
      ? 'Please choose a time'
      : (() => {
          const inputEl = document.createElement('input');
          inputEl.type = 'time';
          inputEl.step = 1800;
          inputEl.min = "10:00";
          inputEl.max = "22:00";
          inputEl.value = time;
          if (inputEl.validity.rangeUnderflow || inputEl.validity.rangeOverflow) {
            return 'Time must be between 10:00 and 22:00';
          }
          if (inputEl.validity.stepMismatch) {
            return 'Please pick a time in 30‑minute increments';
          }
          return '';
        })(),
  guests: guests < 1 || guests > 10 ? 'Guests must be between 1 and 10' : '',
  // Occasion is always valid here since select options are limited
};

useEffect(() => {
  const validate = () => {
    return (
      date.trim() !== '' &&
      time.trim() !== '' &&
      guests >= 1 &&
      guests <= 10
    );
  };
  setFormValid(validate());
}, [date, time, guests]);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!e.target.checkValidity()) {
    // highlight invalid fields
    setTouched({ date: true, time: true, guests: true, occasion: true });
    return;
  }
  onSubmit({ date, time, guests, occasion });
};

  return (
    <form aria-describedby="form-help" onSubmit={handleSubmit} className="booking-form">
      <p id="form-help">All fields marked * are required.</p>
      <label htmlFor="res-date">Choose date</label>
     <input
        type="date"
        name="date"
        id="res-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onBlur={() => setTouched((p) => ({ ...p, date: true }))}
        onInvalid={e => e.target.setCustomValidity('Please choose a valid booking date')}
        onInput={e => e.target.setCustomValidity('')}
        required
        min={todayStr}
        max={maxDateStr}
        aria-invalid={touched.date && !!errors.date}
        aria-describedby="res-date-hint res-date-err"
      />
      <small id="res-date-hint">Pick a future date (until {maxDateStr}).</small>
      {touched.date && errors.date && (
        <p id="res-date-err" role="alert" className="error-message">{errors.date}</p>
      )}

      <label htmlFor="res-time">Choose time</label>
      <div aria-live="polite">
      <input
        type="time"
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onBlur={() => { if (time) setTime(normalizeTime(time)); }}
        list="time-options"
        min="10:00"
        max="22:00"
        step="1800"
        required
        aria-invalid={touched.time && !!errors.time}
        aria-describedby="res-time-hint res-time-err"
      />
    </div>
    <small id="res-time-hint">Available slots, every 30 minutes (10:00–22:00).</small>
    {touched.time && errors.time && (
      <p id="res-time-err" role="alert" className="error-message">{errors.time}</p>
    )}
    <datalist id="time-options">
      {availableTimes.map((t) => <option key={t} value={t} />)}
    </datalist>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        onBlur={() => setTouched((p) => ({ ...p, guests: true }))}
        required
        aria-invalid={touched.guests && !!errors.guests}
        aria-describedby="guests-hint guests-err"
      />
      <small id="guests-hint">Between 1 and 10 guests.</small>
      {touched.guests && errors.guests && (
        <p id="guests-err" role="alert" className="error-message">{errors.guests}</p>
      )}

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

      <button type="submit" className="btn-primary" disabled={!formValid}>
        Submit reservation
      </button>
    </form>
  );
}

export default BookingForm;