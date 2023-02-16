import React from 'react';
import './Calendar.scss';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar() {
  // define the state for the current date using the JS Date object
  const [currentDate, setCurrentDate] = React.useState(() => {
    // try to retrieve the saved date from localStorage
    const savedDate = localStorage.getItem('currentDate');
    return savedDate ? new Date(savedDate) : new Date();
  });

  // get the current year and month from the current date
  const currentYearMonth = `${currentDate.getFullYear()} ${currentDate.toLocaleString('en-US', {
    month: 'long',
  })}`;

  // define a function to handle the date change
  const handleDateChange = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // save the current date to localStorage when you leave the page
  React.useEffect(() => {
    localStorage.setItem('currentDate', currentDate);
  }, [currentDate]);

  return (
    <div className='calendar'>
      <div className='calendar__header'>
        <div className='calendar__controls'>
          <button
            className='calendar__button calendar__button_prev'
            onClick={() => handleDateChange(-1)}
          >
            Back
          </button>
          <button
            className='calendar__button calendar__button_next'
            onClick={() => handleDateChange(1)}
          >
            Next
          </button>
        </div>
        <h1 className='calendar__title'>{currentYearMonth}</h1>
      </div>
      <div className='calendar__body'>
        <div className='calendar__week'>
          {days.map((day) => (
            <div className='calendar__day' key={day}>
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
