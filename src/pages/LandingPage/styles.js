import {makeStyles} from '@mui/styles';

export default makeStyles((theme) => ({
    root:{
        padding:'20px 40px'
    },

    title:{
        fontSize:'20px'
    },

    link:{
        textDecoration: 'none',
        color:'#fff'
    }, 

    exploreBtn: {
        background:'#0f0f0f',
        color:'#fff',
        borderRadius:'50px',
        padding:'10px 20px',
        margin:'5px 0',
        transition:'.4s ease-in-out',

        '&:hover' :{
            background:'#0f0f0f'
        }
    },

    [theme.breakpoints.up('sm')]:{
        title:{
            fontSize:'24px'
        },
        exploreBtn : {
            fontSize:'14px'
        }
    },

    [theme.breakpoints.up('md')]:{
        root:{
            padding:'100px 40px'
        },
        title:{
            fontSize:'28px'
        },
        textContainer : {
            padding:'20px 40px'
        },
        exploreBtn : {
            fontSize:'16px'
        },
        txt: {
            fontSize:'14px'
        }
    }
})) 