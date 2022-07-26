import {makeStyles} from '@mui/styles';

export default makeStyles((theme) => ({
    navRoot : {
        width: '100%',
        background:theme.pallete.primary.main,
        height:'88px',
        position:'relative',
    },

    navContainer : {
        position: 'relative',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        maxWidth:'1200px',
        margin:'0 auto',

    },

    rightLinks : {
        transition:'.4s ease-in-out'
    },

    logoContainer : {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '88px'
    },

    logo : {
        fontSize:'18px',
        margin:'0 20px',
        color:theme.pallete.light,
        fontWeight:theme.typography.fontWeightRegular,
        letterSpacing:'1px'
    },

    logoutBtn : {
        margin:'22px 20px',
        color: theme.pallete.light,
        background:theme.pallete.primary.light,
        padding:'10px 20px',
        fontSize:'14px',
        borderRadius:'30px', 

        '&:hover' : {
            background:theme.pallete.primary.light,
        }
    },

    routeBtn : {
        color:theme.pallete.light,
        background:'transparent',
        fontSize:'14px',
    },

    menuIcon : {
        padding:'26px 10px',
        color:'#fff',
        transition:'.4s ease-in-out'
    },


}));