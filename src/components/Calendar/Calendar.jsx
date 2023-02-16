import './Calendar.scss';

function Calendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // initialize date object using default Date constructor from JavaScript
  const date = new Date();

  // get current year and month using getFullYear() and toLocaleString() methods
  const currentYearMonth =
    date.getFullYear() + ' ' + date.toLocaleString('en-US', { month: 'long' });

  return (
    <div className='calendar'>
      <div className='calendar__header'>
        <div className='calendar__controls'>
          <button className='calendar__button calendar__button_prev'>Back</button>
          <button className='calendar__button calendar__button_next'>Next</button>
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
