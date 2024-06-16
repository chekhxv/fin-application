import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const onChange = date => {
    console.log(date);
  };

  return (
    <div className="calendar">
      <Calendar onChange={onChange} />
    </div>
  );
};

export default MyCalendar;
