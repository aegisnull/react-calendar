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

  // render date boxes for the current month, previous month, and next month
  function getDayClassName(date, isCurrentMonth, isToday) {
    if (!isCurrentMonth || date < 1 || date > daysInMonth) {
      return 'calendar__day_inactive';
    }
    if (isToday) {
      return 'calendar__day_today';
    }
    return '';
  }

  function handleAddAppointment(date) {
    const appointmentName = window.prompt('Enter appointment name');
    if (appointmentName) {
      const appointment = {
        time: date.toISOString(),
        name: appointmentName,
      };
      console.log(appointment);
    }
  }

  const dateBoxes = Array.from(
    { length: Math.ceil((daysInMonth + firstDayOfWeek) / 7) },
    (_, i) => i,
  ).map((week) => (
    <div className='calendar__week' key={week}>
      {Array.from({ length: 7 }, (_, i) => i).map((day) => {
        const date = week * 7 + day + 1 - firstDayOfWeek;
        const isCurrentMonth = currentDate.getMonth() === currentMonthIndex;
        const actualDate = new Date();
        const actualMonth = actualDate.getMonth();
        const isActualMonth = actualMonth === currentMonthIndex;
        const actualYear = actualDate.getFullYear();
        const isActualYear = actualYear === currentDate.getFullYear();
        const isToday = isActualMonth && isActualYear && currentDate.getDate() === date;

        let dateText;
        if (date < 1) {
          dateText = prevMonthLastDay + date;
        } else if (date > daysInMonth) {
          dateText = date - daysInMonth;
        } else {
          dateText = date;
        }

        return (
          <div
            className={`calendar__day ${getDayClassName(date, isCurrentMonth, isToday)}`}
            key={`${week}-${day}`}
            onDoubleClick={() => {
              if (isCurrentMonth && date >= 1 && date <= daysInMonth) {
                const selectedDate = new Date(
                  currentDate.getFullYear(),
                  currentMonthIndex,
                  date,
                  actualDate.getHours(),
                  actualDate.getMinutes(),
                  actualDate.getSeconds(),
                );
                handleAddAppointment(selectedDate);
              }
            }}
          >
            {dateText}
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
            type='button'
          >
            Back
          </button>
          <button
            className='calendar__button calendar__button_next'
            onClick={() => handleDateChange(1)}
            type='button'
          >
            Next
          </button>
        </div>
        <h1 className='calendar__title'>{currentYearMonth}</h1>
        <button
          className='calendar__button calendar__button_reset'
          onClick={handleResetClick}
          type='button'
        >
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
