import React from 'react'
import {Box, Typography, Container} from '@mui/material';
import useStyles from './styles';
const Footer = () => {
	const classes = useStyles();
	return (
	<Box component="footer" className={classes.rootFooter}>
		<Container>
		<Typography variant="subtitle1">All rights reserved &copy; Bart Tabusao {new Date().getFullYear()}</Typography>
		</Container>
	</Box>
	)
}

export default Footer