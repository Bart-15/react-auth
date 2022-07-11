import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CssBaseline} from '@mui/material';
import LandingPage from '../src/pages/LandingPage/LandingPage';
import Register from '../src/components/Register/Register';
import Login from '../src/components/Login/Login';
import HomeLayout from '../src/components/Layout/HomeLayout';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import Homepage from '../src/pages/Homepage/Homepage';
import PersistLogin from './components/PersistLogin/PersistLogin';
import Students from './components/Student/Students';
import AddStudent from './components/Student/AddStudent/AddStudent';

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
          <Route element={<PersistLogin />}>
            <Route element={<HomeLayout allowedRoles={[ROLES.User]} />} >

                  <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                    <Route path="/home" element={<Homepage />} />
                  </Route>

                  
                  <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]}/>}>
                    <Route path="/student" element={<Students />} />
                    <Route path="/student/add" element={<AddStudent />} />
                  </Route>

              </Route>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
