import './Calendar.scss';

function Calendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className='calendar'>
      <div className='calendar__header'>
        <div className='calendar__controls'>
          <button className='calendar__button calendar__button_prev'>Back</button>
          <button className='calendar__button calendar__button_next'>Next</button>
        </div>
        <h1 className='calendar__title'>2023 February</h1>
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
