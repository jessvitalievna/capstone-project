import React from 'react';

function BookingSlot({ time }) {
  return (
    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: 4 }}>
      {time}
    </div>
  );
}

export default BookingSlot;