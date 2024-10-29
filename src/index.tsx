import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

root.render(
  <React.StrictMode>
    <MuiThemeProvider data-joy-color-scheme="dark" theme={createTheme({ palette: { mode: 'dark'}})}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.StrictMode>
);
