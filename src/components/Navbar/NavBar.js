import React from 'react'
import {Container, Grid, Box, Typography, Button} from '@mui/material';
import useStyles from './styles';
const NavBar = () => {
  const classes =  useStyles();
  return (
    <>
      <Box className={classes.navRoot} component="div">
        <Box className={classes.navContainer} component="div">
          <Box className={classes.logoContainer}>
            <Typography variant="subtitle1" className={classes.logo}>JWT AUTH</Typography>
          </Box>
          <Box classsName={classes.rightLinks}>
            <Button className={classes.logoutBtn}>Logout</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default NavBar