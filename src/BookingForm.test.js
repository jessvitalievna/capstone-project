import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingPage from './BookingPage';
import BookingForm from './BookingForm';

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
    expect(screen.getByText(/2025-06-25/i)).toBeInTheDocument();
    expect(screen.getByText(/18:00/i)).toBeInTheDocument();
  });

  it('writes to localStorage when a new booking is submitted', async () => {
    render(<BookingPage />);

    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2025-06-30' } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '19:00' } });
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

// ------------------------
// BookingForm validation tests
// ------------------------

const renderBookingForm = (overrideProps = {}) => {
  const defaultProps = {
    availableTimes: ['10:00', '10:30', '11:00', '12:00', '18:00', '18:30', '19:00', '22:00'],
    onSubmit: jest.fn(),
  };
  const props = { ...defaultProps, ...overrideProps };
  render(<BookingForm {...props} />);
  return props;
};

describe('BookingForm – HTML5 attributes', () => {
  it('date input has type, required, min and max', () => {
    renderBookingForm();
    const date = screen.getByLabelText(/Choose date/i);
    const today = new Date().toISOString().split('T')[0];
    expect(date).toHaveAttribute('type', 'date');
    expect(date).toBeRequired();
    expect(date).toHaveAttribute('min', today);
    expect(date).toHaveAttribute('max', '2025-12-31');
  });

  it('time input has type, required, min/max and is linked to datalist', () => {
    renderBookingForm();
    const time = screen.getByLabelText(/Choose time/i);
    expect(time).toHaveAttribute('type', 'time');
    expect(time).toBeRequired();
    expect(time).toHaveAttribute('min', '10:00');
    expect(time).toHaveAttribute('max', '22:00');
    expect(time).toHaveAttribute('list', 'time-options');
    const datalist = document.getElementById('time-options');
    expect(datalist).toBeInTheDocument();
  });

  it('guests input enforces numeric limits and is required', () => {
    renderBookingForm();
    const guests = screen.getByLabelText(/Number of guests/i);
    expect(guests).toHaveAttribute('type', 'number');
    expect(guests).toBeRequired();
    expect(guests).toHaveAttribute('min', '1');
    expect(guests).toHaveAttribute('max', '10');
  });

  it('occasion select renders the expected options', () => {
    renderBookingForm();
    const select = screen.getByLabelText(/Occasion/i);
    expect(select.tagName.toLowerCase()).toBe('select');
    const optionValues = Array.from(select.querySelectorAll('option')).map(o => o.value);
    expect(optionValues).toEqual(['Birthday', 'Anniversary', 'Wedding', 'Business Meeting', 'Other']);
  });
});

describe('BookingForm – JavaScript validation behavior', () => {
  it("shows date error when past date is entered and blurred", async () => {
    renderBookingForm();
    const date = screen.getByLabelText(/Choose date/i);
    fireEvent.change(date, { target: { value: '2020-01-01' } });
    fireEvent.blur(date);
    expect(await screen.findByText(/Date can't be in the past/i)).toBeInTheDocument();
  });

  it('shows time error on submit when time is outside allowed range', async () => {
    const { onSubmit } = renderBookingForm();
    const user = userEvent.setup();
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2025-06-30' } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '09:00' } }); // invalid (too early)
    const guests = screen.getByLabelText(/Number of guests/i);
    await user.clear(guests);
    await user.type(guests, '2');

    const submit = screen.getByRole('button', { name: /Submit reservation/i });
    expect(submit).toBeEnabled();
    await user.click(submit);

    expect(screen.getByText(/Time must be between 10:00 and 22:00/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows guests error when out of range after blur', async () => {
    renderBookingForm();
    const user = userEvent.setup();
    const guests = screen.getByLabelText(/Number of guests/i);
    await user.clear(guests);
    await user.type(guests, '0');
    fireEvent.blur(guests);
    expect(screen.getByText(/Guests must be between 1 and 10/i)).toBeInTheDocument();
  });

  it('rounds typed time to the nearest 30 minutes on blur', () => {
    renderBookingForm();
    const time = screen.getByLabelText(/Choose time/i);
    fireEvent.change(time, { target: { value: '18:17' } });
    fireEvent.blur(time);
    expect(time).toHaveValue('18:30');
  });

  it('submits valid form and passes normalized values to onSubmit', async () => {
    const { onSubmit } = renderBookingForm();
    const user = userEvent.setup();
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2025-06-30' } });
    const time = screen.getByLabelText(/Choose time/i);
    fireEvent.change(time, { target: { value: '18:17' } });
    fireEvent.blur(time);
    const guests = screen.getByLabelText(/Number of guests/i);
    await user.clear(guests);
    await user.type(guests, '3');
    await user.click(screen.getByRole('button', { name: /Submit reservation/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      date: '2025-06-30',
      time: '18:30',
      guests: 3,
      occasion: 'Birthday',
    });
  });
});


// ---- BookingForm validation tests ----

describe('BookingForm – JavaScript validation behavior', () => {
  it('shows time error on submit when time is outside allowed range', async () => {
    const { onSubmit } = renderBookingForm();
    const user = userEvent.setup();
    const realCreate = document.createElement;
    jest.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = realCreate.call(document, tag);
      if (tag === 'input') {
        Object.defineProperty(el, 'validity', {
          get: () => ({ rangeUnderflow: el.value === '09:00', rangeOverflow: false, stepMismatch: false }),
        });
      }
      return el;
    });

    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2025-06-30' } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '09:00' } }); // invalid (too early)
    const guests = screen.getByLabelText(/Number of guests/i);
    await user.clear(guests);
    await user.type(guests, '2');

    const submit = screen.getByRole('button', { name: /Submit reservation/i });
    await user.click(submit);

    expect(await screen.findByText(/Time must be between 10:00 and 22:00/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    document.createElement.mockRestore();
  });

  it('shows guests error when out of range after blur', async () => {
    expect(await screen.findByText(/Guests must be between 1 and 10/i)).toBeInTheDocument();
  });

  it('submits valid form and passes normalized values to onSubmit', async () => {
    const submitBtn = screen.getByRole('button', { name: /Submit reservation/i });
    await screen.findByDisplayValue('3');
    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);
  });
});
