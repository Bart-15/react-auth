import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CssBaseline} from '@mui/material';
import LandingPage from '../src/pages/LandingPage/LandingPage';
import Register from '../src/components/Register/Register';
import Login from '../src/components/Login/Login';
import HomeLayout from '../src/components/Layout/HomeLayout';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Unauthorized from './components/Unauthorized/Unauthorized';

const ROLES = {
  'User': parseInt(process.env.REACT_APP_USER_CODE),
  'Admin': parseInt(process.env.REACT_APP_ADMIN_CODE),
  'Editor': parseInt(process.env.REACT_APP_EDITOR_CODE)
}

function App() {
  return (
    <div className="main">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]}/>}>
            <Route path="/home" element={<HomeLayout />} >
              {/* all protected routes */}
            </Route>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
