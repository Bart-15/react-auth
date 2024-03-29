import {makeStyles} from '@mui/styles';
import { red } from '@mui/material/colors';

export default makeStyles((theme) => ({
    homeTitle : {
        padding:'20px 0'
    },

    btnStudent : {
        padding :'10px 20px',
        background:red[600],
        color:theme.pallete.light,

        '&:hover' : {
            background:red[700]
        }
    },

    link : {
        textDecoration:'none'
    },

    [theme.breakpoints.up('sm')]:{
        txt:{
            '& span': {
                fontSize:'14px'
            }
        }
    },

    [theme.breakpoints.up('md')]:{
        txt:{
            '& span': {
                fontSize:'16px'
            }
        }
    }
}))