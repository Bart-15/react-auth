import {makeStyles} from '@mui/styles';

export default makeStyles((theme) => ({
    rootContainer : {
        position : 'relative',
        height :'200px',
    },
    center : {
        margin:'0',
        position : 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
    }
}))