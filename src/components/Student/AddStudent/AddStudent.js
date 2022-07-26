import {useState} from 'react';
import {Container, Typography, Box, Paper, TextField, InputLabel, Button} from '@mui/material';
import useStyles from '../styles';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate} from 'react-router-dom';

const initialState = {
	name:"",
	lastName:"",
}

const AddStudent = () => {
	const classes = useStyles();

	const axiosPrivate = useAxiosPrivate();

	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialState);

	const [focusName, setFocusName] = useState(false);
	const [focusLastName, setFocusLastName] = useState(false);

	const [errMessage, setErrMsg] = useState("");
	const [successMessage, setSuccessMessage] = useState("");


	const handleChange = (e) => {
		setFormData({
				...formData,
				[e.target.name] : e.target.value
		})
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		if(!formData.name || !formData.lastName) return setErrMsg("Check all fields");
		try {
		const {data} = await axiosPrivate.post('/students', formData);
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
				setErrMsg("Creation failed")
			}
		} 
	}



	return (
			<>
			<Container>
				<Box component="div">
				<Typography variant="h2" className={classes.title}>Add Student</Typography>
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
								<Button type="submit" disabled={(!formData.name || !formData.lastName) ? true :  false} className={classes.btnSuccess}>Submit</Button>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Container>
			</>
	);
}

export default AddStudent;