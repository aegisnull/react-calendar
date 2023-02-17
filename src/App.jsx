import { Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Calendar />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
