import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './BookingPage';

test('renders the date label in BookingForm', () => {
  render(<BookingForm availableTimes={[]} dispatch={() => {}} onSubmit={() => {}} />);
  const labelElement = screen.getByText('Choose date');
  expect(labelElement).toBeInTheDocument();
});

test('initializeTimes returns default time slots', () => {
  const times = initializeTimes();
  expect(Array.isArray(times)).toBe(true);
  expect(times).toHaveLength(6);
  expect(times).toEqual([
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ]);
});

test('updateTimes returns same times regardless of date', () => {
  const before = ['foo'];
  const date = '2025-06-23';
  const result = updateTimes(before, date);
  expect(result).toEqual(initializeTimes());
});