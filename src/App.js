
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
          <Route path='todo-list' element={<Welcome />} />
          <Route path='todo-list/homepage' element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
