import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ selectedDate, onChange }) => {
  const [startDate, setStartDate] = useState(selectedDate);

  const handleChange = date => {
    setStartDate(date);
    onChange(date); // Pass selected date to parent component
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default DateSelector;
