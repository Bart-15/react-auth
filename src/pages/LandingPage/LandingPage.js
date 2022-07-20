import React from 'react'
import {Link} from 'react-router-dom';
import landingImg from '../../assets/images/landing.svg';
import {Container, Typography, CardMedia, Box, Grid, Button} from '@mui/material';
import useStyles from './styles';


const LandingPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardMedia 
          component="img"
          src={landingImg}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="div" className={classes.textContainer}>
            <Typography variant="h3" className={classes.title}>JWT AUTH</Typography>
            <Typography variant="subtitle1" className={classes.txt}>Hello, I'm Bart Tabusao :) This is my simple implementation of JWT auth with refresh token using the MERN stack. The super admin can change the roles of each user update and delete the students (CRUD). You can use the super admin credentials to explore other features. Here are the credentials:
            </Typography>
            <Typography variant="subtitle1" className={classes.txt}>Email: superadmin@mail.com</Typography>
            <Typography variant="subtitle1" className={classes.txt}>Password: superAdmin123</Typography>
            <Button className={classes.exploreBtn}>
              <Link to="/register" className={classes.link}>
                Explore now!
              </Link>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LandingPage