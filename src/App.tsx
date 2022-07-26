import { ThemeProvider, createTheme } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React from 'react';
import ReactDOM from 'react-dom';

import {Router} from './router';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A9F85'
    },
    secondary: {
      main: '#FF7070'
    },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);