import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
    Grid
} from '@mui/material';
import {AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheck, AiOutlineClose} from 'react-icons/ai';
import useStyles from '../../components/Register/styles';
import * as auth from '../../api/auth';
import useTitle from '../../hooks/useTitle';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
    useTitle("Reset Password");

    const classes = useStyles();
    const {userId, token} = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

    const [showPass, setShowPass] = useState(false);
    const [capOn, setCapOn] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);


    	// password and confirmpassword validation
	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));

		// check if password === matchPassword;
		const match = password === matchPassword;
		setValidMatch(match);
	}, [password, matchPassword]);

    const handleCapsLock = (e) => (passwordFocus && e.getModifierState("CapsLock")) ? setCapOn(true) : setCapOn(false);

    const handleClickShowPassword = () => {
		setShowPass(!showPass);
	}



    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await auth.resetPassword(
                {password: password},
                userId,
                token
            )
            setSuccess(true);
        }catch(err) {
            if(err?.response) {
                if(err?.response?.status === 400) {
                    setErrMsg(err.response.data)
                }
            }
        }
    } 

    console.log(errMsg)
    return ( 
        <>
        <Box className={classes.rootContainer} component="section">
		<Box className={classes.contentBox}>
			<Card className={classes.cardContainer} square={true}>
			<CardContent>
				{
				success ? (
				<Typography className={classes.success} variant="subtitle1"> 
                    Password reset successfully.<br /> 
                    <Typography variant="p" color="primary" fontWeight="bold" style={{cursor:'pointer'}} onClick={() => navigate('/login')}>Sign In</Typography>
				</Typography>) :(
				<>
					<Typography className={classes.formTitle} variant="h2" fontWeight="bold">Reset Password</Typography>
                    {errMsg ? <Typography className={classes.errorMessage}>{errMsg}</Typography> : ""}
					<Box onSubmit={handleSubmit} component="form">
                        <Box component="div" className={classes.formGroup}>
                            <InputLabel id="password" name="password">New Password</InputLabel>
                            <TextField
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={(!validPassword && password) ? true : false}
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
                            placeholder="New Password" 
                            type={showPass ? "text" : "password"}
                            fullWidth
                            ></TextField>
                            {(passwordFocus && capOn ) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>Capslock is on.</Typography>) }
                            {(passwordFocus && password && !validPassword) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>4 to 24 characters. <br /> Must include uppercase and lowercase letters, a number and a special character. <br />  Allowed special characters: # ! @</Typography>)}
                        </Box>
                        <Box component="div" className={classes.formGroup}>
                            <InputLabel id="confirmPassword" name="confirmPassword">Confirm Password</InputLabel>
                            <TextField
                            value={matchPassword}
                            error={(!validMatch && matchPassword) ? true : false}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            name="confirmPassword" 
                            id="confirmPassword"
                            className={classes.textField}
                            autoComplete="off" 
                            placeholder="Confirm Password" 
                            type={showPass ? "text" : "password"}
                            fullWidth
                            InputProps={{
                                endAdornment:(
                                <InputAdornment position="end" >
                                    {(matchFocus && !matchPassword) && (<AiOutlineClose />)}
                                    {( matchPassword && validMatch) && (<AiOutlineCheck color="#63dd73" />)}
                                </InputAdornment>
                                )
                            }}
                            ></TextField>
                            {(matchPassword && !validMatch) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>Password does not match.</Typography>) }
                        </Box>
                        <Box variant="div" className={classes.btnContainer}>
                            <Button type="submit" className={classes.btnSignup} disabled={(!validMatch || !password) ? true : false}>Reset Password</Button>
                        </Box>
					</Box>
				</>  
				)}
			</CardContent>
			</Card>
		</Box>
		</Box>
        </>
    );
}

export default ResetPassword;