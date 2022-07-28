import {useState, useEffect, useRef } from 'react';
import * as auth from '../../api/auth';
import { 
    Button, 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    TextField, 
    InputLabel, 
} from '@mui/material';
import useStyles from '../../components/Register/styles';
import useTitle from '../../hooks/useTitle';



const ForgotPassword = () => {
    useTitle("Forgot Password");

    const classes = useStyles();
    const emailRef = useRef();


    const [email, setEmail] = useState("");
    const [isValidEmail, setValidEmail] = useState(false);
    
    const [isMessage, setMessage] = useState("");
    const [isError, setError] = useState(false);
    useEffect(() => {
        if (email.length > 2) {
            setValidEmail(false);
            setMessage("");
        };
    }, [email])

    const resetPassword = async (e) => {
        e.preventDefault();
        
        if(!email) {
            setValidEmail(true);
            setError(false)
            setMessage("");
            return;
        }

        try{
            const res = await auth.sendEmail({email:email});
            if(res?.data?.success){
                setMessage("We have e-mailed your password reset link!");
                setEmail("");
            } 
        }catch(err) {
            if(err?.response) {
                if(err?.response?.status === 404) {
                    setError(true);
                    setMessage(err.response.data.message);
                }
            }
        }

    }

    return ( 
        <>
        <Box className={classes.rootContainer} component="section">
        <Box className={classes.contentBox}>
            <Card className={classes.cardContainer} square={true}>
                <CardContent>
                    <Typography className={classes.formTitle} variant="h2" fontWeight="bold">
                        Forgot Password
                    </Typography>
                    {isMessage && (<Typography variant="subtitle1" color={isError ? "error" : "dark"} fontWeight="bold">{isMessage}</Typography>)}
                    <Typography variant="subtile1">Enter your email address and we will send you a link to reset your password.</Typography> 
                    <Box component="form" onSubmit={resetPassword}>
                        <Box component="div" className={classes.formGroup}>
                            <InputLabel id="email">Email</InputLabel>
                                <TextField 
                                    ref={emailRef} 
                                    className={classes.textField}
                                    value={email}
                                    error={isValidEmail ? true : false}
                                    helperText={isValidEmail ? "Email field is required" : ""}
                                    // error={(!validEmail && email) ? true : false}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Email"  
                                    fullWidth>
                                </TextField>
                        </Box>
                        <Box variant="div" className={classes.btnContainer}>
                            <Button type="submit" className={classes.btnSignup}>Send email</Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
        </Box>
    </>
    );
}


export default ForgotPassword;