import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import './Calendar.scss';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({ isOpen, onOpen, onClose }) {
  // define the state for the current date using the JS Date object
  const [currentDate, setCurrentDate] = React.useState(() => {
    // try to retrieve the saved date from localStorage
    const savedDate = localStorage.getItem('currentDate');
    return savedDate ? new Date(savedDate) : new Date();
  });

  // define the state for appointments using the useState hook and the initial value from localStorage
  const [appointments, setAppointments] = React.useState(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  // fetch the JSON data and update the appointments state only if the appointments state is empty
  React.useEffect(() => {
    if (appointments.length === 0) {
      fetch('https://altomobile.blob.core.windows.net/api/test.json')
        .then((response) => response.json())
        .then((data) => setAppointments(data));
    }
  }, [appointments]);

  // save the current date to localStorage each time the currentDate state changes
  React.useEffect(() => {
    localStorage.setItem('currentDate', currentDate);
  }, [currentDate]);

  // save the appointments to localStorage each time the appointments state changes
  React.useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

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

  // new state to store the appointment data that was clicked
  const [selectedAppointment, setSelectedAppointment] = React.useState({});

  // handle opening the modal and selecting the appointment
  function handleAppointmentClick(appointment) {
    setSelectedAppointment(appointment);
    onOpen();
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

  function getDateAppointments(date) {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.time);
      return (
        appointmentDate.getFullYear() === currentDate.getFullYear() &&
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getDate() === date
      );
    });
  }

  function handleAddAppointment(date) {
    const appointmentName = window.prompt('Enter appointment name');
    if (appointmentName) {
      const appointment = {
        time: date.toISOString(),
        name: appointmentName,
      };
      setAppointments([...appointments, appointment]); // add the new appointment to the set of appointments
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
            <div className='calendar__day-number'>{dateText}</div>
            {getDateAppointments(date).map((appointment, index) => (
              <div
                key={`appointment-${index}`}
                className='calendar__appointment'
                onClick={() => {
                  if (appointment) {
                    handleAppointmentClick(appointment);
                  }
                }}
              >
                {appointment.name}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className='calendar'>
      {isOpen ? <Modal onClose={onClose} appointmentDetails={selectedAppointment} /> : ''}
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

Calendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Calendar;
