import React, { useReducer, useEffect, useState } from 'react';
import { fetchData, submitAPI } from './api';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import './BookingPage.css';

export function initializeTimes() {
  return [];
}

export function updateTimes(state, action) {
  if (action.type === 'UPDATE_TIMES') {
    return action.payload;
  }
  return state;
}

function BookingPage() {
  const navigate = useNavigate();

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    initializeTimes()
  );

  const [bookingData, setBookingData] = useState(() => {
    const stored = window.localStorage.getItem('bookingData');
    return stored ? JSON.parse(stored) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData]);

  const submitForm = async (formData) => {
    const last = bookingData[bookingData.length - 1];
    if (last?.date === formData.date && last?.time === formData.time) {
      alert('You already booked this date and time.');
      return;
    }

    try {
      const success = await submitAPI(formData);
      if (success) {
        setBookingData((prev) => [...prev, formData]);
        navigate('/confirmed', {
          state: { bookingData: [...bookingData, formData] },
        });
      } else {
        console.error('Submission failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    setLoading(true);
    setError(null);

    fetchData(todayStr)
      .then((times) => {
        dispatch({ type: 'UPDATE_TIMES', payload: times });
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load available times');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDateChange = (newDate) => {
    fetchData(newDate)
      .then((times) => dispatch({ type: 'UPDATE_TIMES', payload: times }))
      .catch(console.error);
  };

  if (loading) return <p>Loading available times…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main className="booking-page">
      <div className="container">
        <h1>Reserve a Table</h1>
        <BookingForm
          availableTimes={availableTimes}
          dispatchDate={handleDateChange}
          onSubmit={submitForm}
        />

        {bookingData.length > 0 && (
          <section className="booking-history">
            <h2>Your Bookings</h2>
            <ul>
              {bookingData.map((b, i) => (
                <li key={i}>
                  {b.date} at {b.time}, {b.guests} guest
                  {b.guests > 1 ? 's' : ''} — {b.occasion}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

export default BookingPage;