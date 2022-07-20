import {makeStyles} from '@mui/styles';
import { green, red } from '@mui/material/colors';

export default makeStyles((theme) => ({
    container :{
        padding:'10px 20px'
    },
    submitBtn : {
        padding:'10px 20px',
        background:green[600],
        borderRadius:'20px',
        color:'#fff',

        '&:hover' : {
            background:green[700]
        }
    },
    successMsg : {
        color:red[700],
        padding:'10px 0',
        fontWeight:'bold'
    }
}))