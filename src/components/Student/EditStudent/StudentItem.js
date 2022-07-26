import {useState, useEffect} from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {Container, Typography, Box, Paper, TextField, InputLabel, Button} from '@mui/material';
import useStyles from '../styles';

const initialState = {
	name:"",
	lastName:"",
}

const EditStudent = () => {
	let { id } = useParams();

	const classes = useStyles();

	const navigate = useNavigate();
	const location = useLocation();

	const [formData, setFormData] = useState(initialState);
	const [isLoading, setLoading] = useState(false);

	const [focusName, setFocusName] = useState(false);
	const [focusLastName, setFocusLastName] = useState(false);

	const axiosPrivate = useAxiosPrivate();

	const [successMessage, setSuccessMessage] = useState("");
	const [errMsg, setErrMsg] = useState("");
	useEffect(() => {
	// check if there's an ID and isValid === true
		if(id){
		if(id.length === 24 &&  !isNaN(Number('0x' + id))){
			return;
		} else {
			navigate(-1)
		}
	}
	}, [])

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		setLoading(true);

		const getStudent = async() => {
		try {
			const {data} = await axiosPrivate.get(`/student/${id}`, 
				{signal:controller.signal}
			);
			isMounted && setFormData({name:data.name, lastName:data.lastName});
			setLoading(false)
		}catch(err) {
			if(err?.response?.status === 401) {
				navigate('/login', {state: {from: location}, replace: true})
			} 
		}
	}

	getStudent();

	// cleanup func
	return () => {
		isMounted =  false;
		controller.abort();
	}

	}, []);

	const handleChange = (e) => {
		setFormData({
		...formData,
		[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		if(!formData.name || !formData.lastName) return setErrMsg("Check all fields");
		try {
		const {data} = await axiosPrivate.patch(`/student/${id}`, formData);
		setSuccessMessage(data?.message);
		setFormData({
			name:'',
			lastName:''
		});
		setTimeout(() => {
			navigate('/students');
			setErrMsg("")
		}, 500)
		}catch(e) {
		if(e?.response?.status === 500) {
			setErrMsg("Update failed")
		}
		}
		console.log('#######', formData)
	}

	return ( 
		<>
		<Container>
		<Box component="div">
			{(!formData || isLoading) ? "Loading..." : (
			<>
			<Typography variant="h2" className={classes.title}>Edit Student</Typography>
				<Paper elevation={12} component="div">
				<Box component="form" className={classes.formContainer} onSubmit={handleSubmit}>
				<Typography variant="subtitle" color="primary">{successMessage && successMessage}</Typography>
					<Box component="div" className={classes.formGroup}>
					<InputLabel id="name">Name</InputLabel> 
					<TextField 
						id="name" 
						name="name" 
						placeholder="Name"
						helperText={(focusName && !formData.name) ? "Required*" : ""} 
						onChange={handleChange} 
						value={formData.name} 
						onFocus={() => setFocusName(true)}
						onBlur={() => setFocusName(false)}
						fullWidth/>  
					</Box>
					<Box component="div" className={classes.formGroup}>
					<InputLabel id="lastName">LastName</InputLabel> 
					<TextField 
						id="lastName" 
						name="lastName" 
						placeholder="LastName"
						helperText={(focusLastName && !formData.lastName) ? "Required*" : ""}  
						onChange={handleChange} 
						value={formData.lastName}
						onFocus={() => setFocusLastName(true)}
						onBlur={() => setFocusLastName(false)} 
						fullWidth/>  
					</Box>
					<Box component="div" className={classes.formGroup}>
					<Button type="submit" disabled={(!formData.name || !formData.lastName) ? true :  false} className={classes.btnSuccess}>Update</Button>
					</Box>
				</Box>
				</Paper>
			</>
			)}
			</Box>
		</Container>
		</> 
	);
}

export default EditStudent;