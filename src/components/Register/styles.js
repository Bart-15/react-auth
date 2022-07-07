import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    rootContainer : {
        position:'relative',
        width:'100%',
        margin:'0 auto',
        height :'100vh',
        background:theme.pallete.primary.light,
        color:theme.pallete.light
    },
     
    contentBox : {
        transision:'.4s ease-in-out',
        padding:'100px 20px',
        margin:'0 auto',
        maxWidth:'1200px',
    },

    cardContainer : {
        padding:'10px 20px',
        borderRadius:'20px',
        margin:'0 auto',
        maxWidth:'600px',
        border: "none",
        boxShadow: "none"
    },
    formTitle : {
        fontSize:'22px',
        paddingBottom:'10px',
    },

    formGroup : {
      padding:'10px 0',  
    },

    formGrid : {
        transision:'.4s ease-in-out',
    },


    btnContainer : {
        textAlign:'center',
    },

    btnSignup : {
        background:theme.pallete.primary.light,
        color:theme.pallete.light,
        padding:'10px 20px',
        fontSize:'14px',
        
        '&:hover' :{
            background:theme.pallete.primary.main
        }
    },

    btnLogin : {
        background:theme.pallete.primary.light,
        color:theme.pallete.light,
        padding:'10px 20px',
        fontSize:'14px',
        margin:'10px 0',
        '&:hover' :{
            background:theme.pallete.primary.main
        }
    },

    divider : {
        padding:'10px 0'
    },

    oAuthContainer : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon : {
        fontSize:'30px',
        margin:'20px 10px 0',
        cursor:'pointer'
    },

    alreadyAccountsContainer : {
        padding:'50px 0 0'
    },

    success : {
        textAlign:'center',
        padding:'100px 0'
    },

    errorMessage : {
        fontSize:'11px',
        fontWeight:'bold',
    }

}))