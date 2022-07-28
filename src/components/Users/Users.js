import {useState, useEffect} from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useTitle from '../../hooks/useTitle';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {Box, Container, Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { AiFillEdit} from 'react-icons/ai';
import Spinner from '../Spinner/Spinner';
import useStyles from '../Student/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));



const Users = () => {
	useTitle("Users List")

	const [users, setUsers] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const axiosPrivate = useAxiosPrivate();

	const classes = useStyles();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() =>{
		let isMounted = true;
		const controller = new AbortController();
		setLoading(true)

		const getUsers = async() => {
			try {
				const {data} = await axiosPrivate('/users', {
				signal:controller.signal
				});

				isMounted && setUsers(data);
				setLoading(false)
			}catch(err) {
				if(err?.response?.status === 401) {
				navigate('/login', {state: {from: location}, replace: true})
				}
			}
		}

		getUsers();


		// clean up useEffect
		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [])


	return ( 
			<>
				<Container>
					<Box component="div">
					<Container>
						<Box className={classes.root} component="div">
						{(isLoading) && (<Spinner />)}
						{
							(users && !isLoading) && (
							<Box component="div" mt={1}>
								<TableContainer component={Paper}>
								<Table>
									<TableHead>
									<TableRow>
										<StyledTableCell>ID</StyledTableCell>
										<StyledTableCell align="left">Username</StyledTableCell>
										<StyledTableCell align="left">Email</StyledTableCell>
										<StyledTableCell align="left">Roles</StyledTableCell>
										<StyledTableCell align="left">Actions</StyledTableCell>
									</TableRow>
									</TableHead>
									<TableBody>
									{users.map((user) => (
										<StyledTableRow key={user._id}>
										<StyledTableCell component="th" scope="row">
											{user._id}
										</StyledTableCell>
										<StyledTableCell align="left">{user.userName}</StyledTableCell>
										<StyledTableCell align="left">{user.email}</StyledTableCell>
										<StyledTableCell align="left">{Object.keys(user?.roles).join(',')}</StyledTableCell>
										<StyledTableCell align="left">
											<Link to={`/user/${user._id}`} style={{textDecoration: 'none', color: 'white'}}>
												<Button className={classes.btnSuccess} fontWeight='fontWeightLight'>
													<AiFillEdit color="#fff"/> Edit Roles
												</Button>
											</Link>
										</StyledTableCell>
										</StyledTableRow>
									))}
									</TableBody>
								</Table>
								</TableContainer>
							</Box>
							) 
						}
						</Box>
					</Container>
					</Box>
				</Container>
			</>	
	);
}
export default Users;