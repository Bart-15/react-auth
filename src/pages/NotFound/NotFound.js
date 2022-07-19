import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Grid, CardMedia, Typography, Box, Button} from '@mui/material';
import notFound from '../../assets/images/notFound.png';
import useStyles from '../Unauthorized/styles';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const NotFound = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [btnText, setBtnText] = useState("Go to homepage.");
    const [data, setData] = useState({});
    
    
    const goBack = () =>  {
        if(data?.userName) return navigate('/home');
        
        // if unauthenticated go to landing page.
        navigate('/');
    }

    
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    
    const getUser = async() => {
      try {
        const {data} = await axiosPrivate.get('/user',
        {signal:controller.signal});
        isMounted && setData(data);

      }catch (err) {
        if(err?.response?.status === 401) {
            setBtnText("Go back")
        }
      }
    }

    getUser();

    return () => {
      isMounted =  false;
      controller.abort();
    }
    
  }, [])



    return ( 
        <>
        <Container>
            <Grid container spacing={2} className={classes.rootContainer}>
            <Grid item xs={12} md={6}>
                <CardMedia 
                component="img"
                src={notFound}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Box className={classes.rightContainer} component="div">
                    <Typography variant="h2" fontWeight="fontWeightMedium" color="error" className={classes.topline}>404</Typography>
                    <Typography variant="h3" className={classes.secondTopline} color="error">Sorry, Page not found.</Typography>
                    <Typography variant="subtitle1" className={classes.text}>The page you requested could not be found.</Typography>
                    <Button onClick={goBack} className={classes.backBtn}>{btnText}</Button>
                </Box>
            </Grid>
            </Grid>
        </Container>
        </>
     );
}
 
export default NotFound;