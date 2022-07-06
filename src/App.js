import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CssBaseline} from '@mui/material';
import LandingPage from '../src/pages/LandingPage/LandingPage';
import Register from '../src/components/Register/Register';
import Login from '../src/components/Login/Login';


function App() {
  return (
    <div className="main">
      <CssBaseline />
      <Router>
        <Routes>
          <Route  path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
