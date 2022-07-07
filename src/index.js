import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import {AuthProvider} from '../src/context/AuthProvider';
import {
  ThemeProvider,
  createTheme,
} from "@mui/material";


const theme = createTheme({
  pallete : {
   primary : {
    main: '#4491de',
    light : '#399cff'
   },
   success : {
    main:'#60dc6f'
   },
   dark : {
     main:'#111', 
     light:'#333'
   },
   light : '#fff'
  },
  typography: {
    "fontFamily": `'Montserrat', sans-serif`,
    "fontSize": 12,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
