import './App.css';
import Welcome from './components/Welome';
import Homepage from './components/Homepage';
import {
  BrowserRoute,
  Routes,
  Route
} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <BrowserRoute>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/homepage' element={<Homepage />} />
        </Routes>
      </BrowserRoute>
    </div>
  )
}

export default App;
