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

  // function to handle the back and next buttons by incrementing or decrementing the month by 1 (increment = -1 or 1)
  function handleDateChange(increment) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  }

  // function to handle the reset button by setting the current date to today
  function handleResetClick() {
    setCurrentDate(new Date());
  }

  // save the current date to localStorage when you leave the page
  React.useEffect(() => {
    localStorage.setItem('currentDate', currentDate);
  }, [currentDate]);

  const currentMonthIndex = currentDate.getMonth();

  // get the number of days in the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // get the day of the week for the first day of the current month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // get the number of days in the previous month
  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  // render date boxes for the current month, previous month, and next month
  const dateBoxes = Array.from(
    { length: Math.ceil((daysInMonth + firstDayOfWeek) / 7) },
    (week, i) => i,
  ).map((week) => (
    <div className='calendar__week' key={week}>
      {Array.from({ length: 7 }, (week, i) => i).map((day) => {
        const date = week * 7 + day + 1 - firstDayOfWeek;
        const isCurrentMonth = currentDate.getMonth() === currentMonthIndex;
        const isToday = currentDate.getDate() === date;
        return (
          <div
            className={`calendar__day ${
              !isCurrentMonth ? 'calendar__day_inactive' : isToday ? 'calendar__day_today' : ''
            }`}
            key={`${week}-${day}`}
          >
            {date < 1 ? prevMonthLastDay + date : date > daysInMonth ? date - daysInMonth : date}
          </div>
        );
      })}
    </div>
  ));

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
        <button className='calendar__button calendar__button_reset' onClick={handleResetClick}>
          Today
        </button>
      </div>
      <div className='calendar__body'>
        <div className='calendar__week'>
          {days.map((day) => (
            <div className='calendar__day-name' key={day}>
              {day}
            </div>
          ))}
        </div>
        {dateBoxes}
      </div>
    </div>
  );
}

export default Calendar;
