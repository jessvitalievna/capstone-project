import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ConfirmedBooking() {
  const { state } = useLocation();
  const bookingData = state?.bookingData || [];

  return (
    <main className="confirmed-booking-page">
      <div className="container">
        <h1>Booking Confirmed</h1>
        {bookingData.length > 0 && (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Date</th><th>Time</th><th>Guests</th><th>Occasion</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((b, idx) => (
                <tr key={idx}>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.guests}</td>
                  <td>{b.occasion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="confirmation-message">
          Thank you for your reservation! We look forward to seeing you. :)
        </p>
      </div>
    </main>
  );
}