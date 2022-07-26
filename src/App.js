import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CssBaseline} from '@mui/material';
import {
	Register, 
	Login,
	HomeLayout,
	RequireAuth,	
	PersistLogin,
	Students,
	AddStudent,
	EditStudent,
	Users,
	EditUser
} from './components';
import {
	Unauthorized,
	Homepage,
	LandingPage,
	NotFound,
	ForgotPassword,
	ResetPassword
} from './pages';



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
			<Route path="/unauthorized" element={<Unauthorized />} />
			<Route path="/reset" element={<ForgotPassword />} />
			<Route path="/password/reset/:userId/:token" element={<ResetPassword />} />



			{/* Protected routes */}
			<Route element={<PersistLogin />}>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route element={<HomeLayout allowedRoles={[ROLES.User]} />} >

					<Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
						<Route path="/home" element={<Homepage />} />
					</Route>

					{/* admin and editors only */}
					<Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]}/>}>
						<Route path="/students" element={<Students />} />
						<Route path="/student/add" element={<AddStudent />} />
						<Route path="/student/:id" element={<EditStudent />} />
					</Route>

					{/* Only admin */}
					<Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
						<Route path="/users" element={<Users />} />
						<Route path="/user/:id" element={<EditUser roles={ROLES} />} />
					</Route>

				</Route>
			</Route> 
			{/* end protected routes */}

			<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
		</div>
	);
}

export default App;
