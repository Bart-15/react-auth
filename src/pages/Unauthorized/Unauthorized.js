import {useNavigate} from 'react-router-dom';
import {Container, Grid, CardMedia, Typography, Box, Button} from '@mui/material';
import unAuth from '../../assets/images/un_auth.jpg';
import useStyles from './styles';
const Unauthorized = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const goBack = () =>  navigate(-1);

  return (
    <Container>
        <Grid container spacing={2} className={classes.rootContainer}>
          <Grid item xs={12} md={6}>
            <CardMedia 
             component="img"
             src={unAuth}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.rightContainer} component="div">
                <Typography variant="h2" fontWeight="fontWeightMedium" color="error" className={classes.topline}>Server Error</Typography>
                <Typography variant="h3" className={classes.secondTopline} color="error">401 - Unauthorized: Access is denied due to invalid credentials.</Typography>
                <Typography variant="subtitle1" className={classes.text}>You do not have permission to view this directory or page using the credentials that you supplied.</Typography>
                <Button onClick={goBack} className={classes.backBtn}>Go back</Button>
            </Box>
          </Grid>
        </Grid>
    </Container>
  )
}

export default Unauthorized