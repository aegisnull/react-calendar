import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

function Modal({ onClose, appointmentDetails }) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(appointmentDetails.time).toLocaleString('en-US', options);

  const modalRef = React.useRef();

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    function handleOutsideClick(e) {
      if (!modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className='modal'>
      <div ref={modalRef} className='modal__content'>
        <h1 className='modal__title'>Appointment</h1>
        <p className='modal__appointment'>
          <span className='modal__bold'>Date: </span>
          {formattedDate}
        </p>
        <p className='modal__appointment'>
          <span className='modal__bold'>Name: </span> {appointmentDetails.name}
        </p>
        <div className='modal__buttons'>
          <button className='modal__button' type='button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  appointmentDetails: PropTypes.shape({
    time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;
