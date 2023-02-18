import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpen = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Calendar isOpen={isModalOpen} onOpen={handleModalOpen} onClose={handleModalClose} />
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
