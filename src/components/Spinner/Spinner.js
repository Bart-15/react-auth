import {Container, Box} from '@mui/material';
import spinner from '../../assets/images/spinner.gif';
import useStyles from './styles';
const Spinner = () => {
    const classes = useStyles();
    return ( <>
        <Container className={classes.rootContainer}>
            <Box component="div" className={classes.center}>
                <img src={spinner} alt="spinner" />
            </Box>
        </Container>
    </> );
}

export default Spinner;