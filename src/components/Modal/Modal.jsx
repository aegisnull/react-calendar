import './Modal.scss';

function Modal({ onClose, appointmentDetails }) {
  return (
    <div className='modal'>
      <div className='modal__content'>
        <h1 className='modal__title'>Appointment</h1>
        <p className='modal__appointment'>Date: {appointmentDetails.time}</p>
        <p className='modal__appointment'>Name: {appointmentDetails.name}</p>
        <div className='modal__buttons'>
          <button className='modal__button'>Delete</button>
          <button className='modal__button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
