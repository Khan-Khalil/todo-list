
import './App.css';
import Welcome from './components/Welome';
import Homepage from './components/Homepage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/homepage' element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
