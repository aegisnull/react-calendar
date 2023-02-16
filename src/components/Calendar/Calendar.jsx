import './Calendar.scss';

function Calendar() {
  return (
    <div className='calendar'>
      <div className='calendar__header'>
        <div className='calendar__controls'>
          <button className='calendar__button calendar__button_prev'>Back</button>
          <button className='calendar__button calendar__button_next'>Next</button>
        </div>
        <h1 className='calendar__title'>2023 February</h1>
      </div>
    </div>
  );
}

export default Calendar;
