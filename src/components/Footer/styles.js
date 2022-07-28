import {makeStyles} from '@mui/styles';

export default makeStyles((theme) => ({
    rootFooter : {
        position:'relative', 
        bottom:'0',
        left:'0',
        width:'100%',
        height:'100px',
        textAlign:'center',
        color:theme.pallete.primary.main,
    },

    links : {
        margin:'2px 3px'
    }
}))