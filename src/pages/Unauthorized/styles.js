import {makeStyles} from '@mui/styles';

export default makeStyles((theme) => ({
    rootContainer: {
        padding:'40px 20px',

    },
    
    rigthContainer: {
        'h2' : {
            fontSize:'10px'
        }
    },

    topline : {
        fontSize:'20px'
    },
    secondTopline : {
        fontSize:'14px',
        fontWeight:'bold'
    },

    backBtn : {
        color:theme.pallete.light,
        background:theme.pallete.primary.light,
        padding:'10px 20px',
        margin:'5px 0',
        fontSize:'12px',
        transision:'.4s ease-in-out',
        
        '&:hover': {
            background:theme.palette.primary.main,
        }
    },


    [theme.breakpoints.up('sm')] : {
        topline : {
            fontSize:'28px'
        },
        secondTopline : {
            fontSize:'16px'
        }
    },



    [theme.breakpoints.up('md')] : {
      backBtn : {
        fontSize:'14px',
      }, 
      topline: {
        fontSize:'40px'
      },
      text : {
        fontSize:'16px'
      },
      secondTopline : {
        fontSize:'28px'
      },
      rootContainer: {
        padding:'100px 20px'
      },

      rightContainer: {
        padding:'100px 20px'
      }
    }
}))