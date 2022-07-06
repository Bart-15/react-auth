import React, {useState, useRef, useEffect} from 'react'
import useStyles from './styles';
import {useNavigate} from 'react-router-dom';
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



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // capslock is on
  const [capOn, setCapOn] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPass, setShowPass] = useState(false)
  const classes = useStyles();
  const navigate = useNavigate();


  useEffect(() => {
    userRef.current.focus();
  }, [])

  // username validation useEffect
  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  // email validation
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  // password and confirmpassword validation
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));

    // check if password === matchPassword;
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  //error message
  useEffect(() => {

  }, [user, password, matchPassword]);

  const handleCapsLock = (e) => (passwordFocus && e.getModifierState("CapsLock")) ? setCapOn(true) : setCapOn(false);
  
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  }

  return (
    <Box className={classes.rootContainer} component="div">
      <Box className={classes.contentBox}>
        <Card className={classes.cardContainer} square={true}>
          <CardContent>
            <Typography className={classes.formTitle} variant="h2" fontWeight="bold">
              Sign Up
            </Typography>
            <Box component="form">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="username">Username</InputLabel>
                  <Box component="div" className={classes.formGrid}>
                    <TextField 
                      ref={userRef} 
                      value={user} 
                      onChange={(e) => setUser(e.target.value)}
                      error={(!validUser && user) ? true : false}
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      InputProps={{
                        endAdornment:(
                          <InputAdornment position="end" >
                            {(userFocus && user && !validUser) && (<AiOutlineClose />)}
                            {( user && validUser) && (<AiOutlineCheck color="#63dd73" />)}
                          </InputAdornment>
                        )
                      }}
                      autoComplete="off"
                      name="username" 
                      id="username" 
                      className={classes.textField} 
                      placeholder="Username" 
                      fullWidth>
                    </TextField>
                    {(userFocus && user && !validUser) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>4 to 24 characters. <br /> Must begin with a letter. <br /> Only accept letters, numbers, underscore and hypens allowed.</Typography>)}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box component="div" className={classes.formGrid}>
                    <InputLabel id="email">Email</InputLabel>
                    <TextField 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      error={(!validEmail && email) ? true : false}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      InputProps={{
                        endAdornment:(
                          <InputAdornment position="end">
                            {(emailFocus && email && !validEmail) && (<AiOutlineClose />)}
                            {( email && validEmail) && (<AiOutlineCheck color="#63dd73" />)}
                          </InputAdornment>
                        )
                      }}
                      name="email" 
                      autoComplete="off" 
                      id="email" 
                      className={classes.textField} 
                      placeholder="Email" 
                      fullWidth>
                    </TextField>
                    {(emailFocus && email && !validEmail) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>Invalid email address.</Typography>)}
                  </Box>
                </Grid>
              </Grid>
              <Box component="div" className={classes.formGroup}>
                <InputLabel id="password" name="password">Password</InputLabel>
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
                  placeholder="Password" 
                  type={showPass ? "text" : "password"}
                  fullWidth
                ></TextField>
                {(passwordFocus && capOn ) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>Capslock is on.</Typography>) }
                {(passwordFocus && password && !validPassword) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>4 to 24 characters. <br /> Must include uppercase and lowercase letters, a number and a special character. <br />  Allowed special characters: # ! @</Typography>)}
              </Box>
              <Box component="div" className={classes.formGroup}>
                <InputLabel id="confirmpPassword" name="confirmPassword">Confirm Password</InputLabel>
                <TextField
                  value={matchPassword}
                  error={(!validMatch && matchPassword) ? true : false}
                  onChange={(e) => setMatchPassword(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  name="confirmpPassword" 
                  id="confirmpPassword"
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
                <Button className={classes.btnSignup}>Sign Up</Button>
              </Box>
            </Box>
            <Box component="div" className={classes.alreadyAccountsContainer}>
              <Typography variant="subtitle1" align="center">Already have an account? 
                  <Typography variant="p" color="primary" fontWeight="bold" style={{cursor:'pointer'}} onClick={() => navigate('/login')}> Sign In</Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default Register;