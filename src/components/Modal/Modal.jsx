import './Modal.scss';

function Modal() {
  return (
    <div className='modal'>
      <div className='modal__content'>
        <h1>Appointment</h1>
        <p className='modal__appointment'>Appointment details</p>
        <button className='modal__button'>Delete</button>
        <button className='modal__button'>Close</button>
      </div>
    </div>
  );
}

export default Modal;
