import  {makeStyles} from '@mui/styles';
import { red, green } from '@mui/material/colors';



export default makeStyles((theme) => ({
    root : {
      padding:'30px 0'
    },

    btnDelete : {
      background:red[400],
      color:theme.pallete.light,
      borderRadius:'20px',
      marginRight:'12px',
      

      '&:hover' : {
        background:red[500]
      }
    },

    btnSuccess : {
      background:green[400],
      color:theme.pallete.light,
      borderRadius:'20px',
      padding:'10px 20px',
      

      '&:hover' : {
        background:green[500]
      }
    },

    title: {
      padding:'10px 0',
      fontSize:'18px',
      fontWeight:'bold',
    },

    formGroup : {
      padding:'5px 0'
    },

    formContainer : {
      padding:'20px 40px'
    }
}))