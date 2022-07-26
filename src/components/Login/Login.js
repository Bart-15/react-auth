import React, {useState, useEffect, useRef} from 'react'
import useStyles from '../Register/styles';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import { 
	Button, 
	Box, 
	Card, 
	CardContent, 
	Typography, 
	TextField, 
	InputLabel, 
	InputAdornment, 
	IconButton,
} from '@mui/material';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';
import * as api from '../../api/auth';

// form initial state


const Login = () => {
	const {auth, setAuth} = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/home";

	const emailRef = useRef();
	const errRef = useRef();
	const [showPass, setShowPass] = useState(false)
	const classes = useStyles();

	const [password, setPassword] = useState("");
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [email, setEmail] = useState("");
	const [emailFocus, setEmailFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");


	// capslock is on
	const [capOn, setCapOn] = useState(false);
	useEffect(() => {
	emailRef.current.focus();
	}, [])

	useEffect(() => {
		if(auth?.accessToken){
			navigate('/home')
		} else {
			navigate('/login')
		}
	}, [])

	const handleCapsLock = (e) => (passwordFocus && e.getModifierState("CapsLock")) ? setCapOn(true) : setCapOn(false);


	const handleClickShowPassword = () => {
	setShowPass(!showPass);
	}

	const handleSubmit = async(e) => {
	e.preventDefault();
	setErrMsg("")

	const data = {email, password};
	
	try {
		const res = await api.login(data);

		const roles = res?.data?.roles;
		const accessToken = res?.data?.accessToken;

		setAuth({ email, password, roles, accessToken});
		console.log(email, password, roles, accessToken)
		navigate(from, {replace:true});
	}catch(err) {
		if(!err?.response) {
		setErrMsg("Ooops, something went wrong");
		} else if(err.response?.status === 409) {
		console.log(err.response)
		setErrMsg(err.response.data.message)
		} else if(err.response?.status === 404) {
		setErrMsg(err.response.data.message)
		} else {
		setErrMsg("Login Failed");
		}
	}
	
	}
	console.log("#####data", auth)
	return (
	<Box className={classes.rootContainer} component="section">
		<Box className={classes.contentBox}>
		<Card className={classes.cardContainer} square={true}>
			<CardContent>
			<Typography className={classes.formTitle} variant="h2" fontWeight="bold">
				Sign In
			</Typography>
			<Typography variant="subtitle1" color="error" className={classes.errorMessage}>{errMsg}</Typography>
			<Box onSubmit={handleSubmit} component="form">
				<Box component="div" className={classes.formGroup}>
				<InputLabel id="email">Email</InputLabel>
				<TextField 
					ref={emailRef} 
					className={classes.textField}
					value={email}
					// error={(!validEmail && email) ? true : false}
					onChange={(e) => setEmail(e.target.value)}
					onFocus={() => setEmailFocus(true)}
					onBlur={() => setEmailFocus(false)}
					autoComplete="off" 
					name="email" 
					id="email" 
					placeholder="Email"  
					fullWidth>
				</TextField>
				</Box>
				<Box component="div" className={classes.formGroup}>
				<InputLabel id="password" name="password">Password</InputLabel>
				<TextField
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					// error={!password ? true : false}
					onFocus={() => setPasswordFocus(true)}
					onBlur={() => setPasswordFocus(false)}
					onKeyDown={handleCapsLock}
					InputProps={{
					endAdornment:(
						<InputAdornment position="end" >
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							// onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPass ? <AiOutlineEye /> :  <AiOutlineEyeInvisible />}
						</IconButton>
						</InputAdornment>  
					)
					}}
					name="password" 
					autoComplete="off" 
					className={classes.textField}
					placeholder="Password" 
					type={showPass ? "text" : "password"}
					fullWidth
				></TextField>
				{(passwordFocus && capOn ) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>Capslock is on.</Typography>) }
				</Box>
				<Box className={classes.formGroup}>
					<Link to="/reset" className={classes.resetLink}>
						<Typography variant="subtile1">Forgot Password?</Typography>
					</Link>
				</Box>
				<Box variant="div" className={classes.btnContainer}>
					<Button type="submit" disabled={(!email || !password) ?  true : false} className={classes.btnLogin}>Sign In</Button>
				</Box>
				<Box component="div" className={classes.alreadyAccountsContainer}>
				<Typography variant="subtitle1" align="center">Don't have an account?  
					<Typography variant="p" color="primary" fontWeight="bold" style={{cursor:'pointer'}} onClick={() => navigate('/register')}> Sign Up</Typography>
				</Typography>
			</Box>
			</Box>
			</CardContent>
		</Card>
		</Box>
	</Box>
	)
}

export default Login;