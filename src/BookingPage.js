import React, { useReducer } from 'react';
import BookingForm from './BookingForm';
import './BookingPage.css';

// Exported initializer function for use in tests
export function initializeTimes() {
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

// Exported reducer function for use in tests
export function updateTimes(state, selectedDate) {
  // Placeholder logic for now — always returns default times
  return initializeTimes();
}

function BookingPage() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  const handleBookingSubmit = (data) => {
    console.log('Reservation data:', data);
  };

  return (
    <main>
      <div className='container'>
      <h1>Reserve a Table</h1>
      <BookingForm
        onSubmit={handleBookingSubmit}
        availableTimes={availableTimes}
        dispatch={dispatch}
      />
      </div>
    </main>
  );
}

export default BookingPage;