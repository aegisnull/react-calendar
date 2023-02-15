import { Routes, Route } from 'react-router-dom'
import Calendar from './components/Calendar/Calendar'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
    </div>
  )
}

export default App
