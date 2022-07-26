import {Box, Typography, Button} from '@mui/material';
import useLogout from '../../hooks/useLogout';
import {useNavigate} from 'react-router-dom';
import useStyles from './styles';

const NavBar = () => {
	const classes =  useStyles();
	const logout = useLogout();
	const navigate = useNavigate();


	const handleLogout = async() => {
		await logout();
		navigate('/login')
	}
	return (
		<>
		<Box className={classes.navRoot} component="div">
			<Box className={classes.navContainer} component="div">
			<Box className={classes.logoContainer}>
				<Typography variant="subtitle1" className={classes.logo}>JWT AUTH</Typography>
			</Box>
			<Box classsName={classes.rightLinks} sx={{display: { xs: 'none', sm: 'none', md:'block' }}}>
				<Button className={classes.routeBtn} onClick={() => navigate('/home')}>Home</Button>
				<Button className={classes.routeBtn} onClick={() => navigate('/students')}>Students</Button>
				<Button className={classes.routeBtn} onClick={() => navigate('/users')}>Users</Button>
				<Button onClick={handleLogout} className={classes.logoutBtn}>Logout</Button>
			</Box>
			</Box>
		</Box>
		</>
	)
}

export default NavBar