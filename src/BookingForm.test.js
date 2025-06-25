import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingPage from './BookingPage';

beforeAll(() => {
  jest.spyOn(Storage.prototype, 'getItem');
  jest.spyOn(Storage.prototype, 'setItem');
});

beforeEach(() => {
  localStorage.clear();
});

describe('BookingPage – Local Storage behavior', () => {
  it('reads from localStorage on mount and displays stored booking', () => {
    const stored = [{ date: '2025-06-25', time: '18:00', guests: 2, occasion: 'Birthday' }];
    localStorage.setItem('bookingData', JSON.stringify(stored));

    render(<BookingPage />);

    expect(localStorage.getItem).toHaveBeenCalledWith('bookingData');
    expect(screen.getByText(/2025-06-25 at 18:00/)).toBeInTheDocument();
  });

  it('writes to localStorage when a new booking is submitted', async () => {
    render(<BookingPage />);

    userEvent.type(screen.getByLabelText(/Choose date/i), '2025-06-30');
    userEvent.type(screen.getByLabelText(/Choose time/i), '19:00');
    userEvent.clear(screen.getByLabelText(/Number of guests/i));
    userEvent.type(screen.getByLabelText(/Number of guests/i), '3');
    userEvent.selectOptions(screen.getByLabelText(/Occasion/i), 'Anniversary');

    userEvent.click(screen.getByRole('button', { name: /Submit reservation/i }));

    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'bookingData',
      expect.stringContaining('"date":"2025-06-30"')
    );
  });
});