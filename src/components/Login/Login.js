import React, {useState, useEffect, useRef} from 'react'
import useStyles from '../Register/styles';
import {useNavigate} from 'react-router-dom';
import {FaFacebook, FaGithub, FaGoogle} from 'react-icons/fa'
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
  Divider,
} from '@mui/material';
import {AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheck, AiOutlineClose} from 'react-icons/ai';


// form initial state
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;

const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false)
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  
  // capslock is on
  const [capOn, setCapOn] = useState(false);
  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

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
              Sign In
            </Typography>
            <Box component="form">
              <Box component="div" className={classes.formGroup}>
                <InputLabel id="email">Email</InputLabel>
                <TextField 
                  ref={emailRef} 
                  className={classes.textField}
                  value={email}
                  error={(!validEmail && email) ? true : false}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="off" 
                  name="email" 
                  id="email" 
                  placeholder="Email"  
                  fullWidth>
                </TextField>
                {(emailFocus && email && !validEmail) && (<Typography variant="subtitle1" color="error" className={classes.errorMessage}>Invalid email address.</Typography>)}
              </Box>
              <Box component="div" className={classes.formGroup}>
                <InputLabel id="password" name="password">Password</InputLabel>
                <TextField
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!password ? true : false}
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
              <Box variant="div" className={classes.btnContainer}>
                <Button className={classes.btnLogin}>Sign In</Button>
              </Box>
              <Divider className={classes.divider}>or</Divider>
                <Box component="div" className={classes.oAuthContainer}>
                    <Box component="div" className={classes.iconContainer}>
                    <FaGoogle className={classes.icon} color="#ea4335"/>
                    <FaFacebook className={classes.icon} color="#4267B2"/>
                    <FaGithub className={classes.icon} color="#333"/>
                    </Box>
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