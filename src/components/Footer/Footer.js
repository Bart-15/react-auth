import React from 'react'
import {Box, Typography, Container, Link} from '@mui/material';
import useStyles from './styles';
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai'
const Footer = () => {
	const classes = useStyles();
	return (
	<Box component="footer" className={classes.rootFooter}>
		<Container>
			<Typography variant="subtitle1">All rights reserved &copy; Bart Tabusao {new Date().getFullYear()}</Typography>
			<Box className={classes.socialLinks}>
				<Link component="a" target="__blank" href="https://www.linkedin.com/in/bart-tabusao-2b1480137">
					<AiFillLinkedin size={30} className={classes.links} color="#0072b1"/>
				</Link>
				<Link component="a" target="__blank" href="https://github.com/Bart-15">
					<AiFillGithub size={30} className={classes.links} color="#333"/>
				</Link>
			</Box>
		</Container>
	</Box>
	)
}

export default Footer