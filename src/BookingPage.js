import React, { useReducer, useEffect, useState } from 'react';
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
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // INITIAL LOAD: grab today's times once fetchData is available
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let mounted = true;

    async function loadTimes(date) {
      try {
        const times = await window.fetchData(date);
        if (!mounted) return;
        if (!Array.isArray(times)) throw new Error('Bad response');
        dispatch({ type: 'UPDATE_TIMES', payload: times });
      } catch {
        if (!mounted) return;
        setError('Failed to load times');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTimes(today);
    return () => { mounted = false; };
  }, []);

  // DATE CHANGE: fetch new times for selected date
  const handleDateChange = (newDate) => {
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const times = await window.fetchData(newDate);
        if (!Array.isArray(times)) throw new Error('Bad response');
        dispatch({ type: 'UPDATE_TIMES', payload: times });
      } catch {
        setError('Failed to load times');
      } finally {
        setLoading(false);
      }
    })();
  };

  const submitForm = async (formData) => {
    try {
      const success = await window.submitAPI(formData);
      if (success) navigate('/confirmed', { state: { formData } });
    } catch (e) {
      console.error(e);
    }
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
      </div>
    </main>
  );
}

export default BookingPage;