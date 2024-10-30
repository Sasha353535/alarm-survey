// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Создание темы с использованием новых шрифтов
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Светло-голубой для кнопок и акцентов
    },
    background: {
      default: '#121212', // Темный фон
      paper: '#000000', // Черный фон для форм
    },
    text: {
      primary: '#ffffff',  // Белый текст
      secondary: '#b0b0b0',// Светло-серый текст
    },
  },
  typography: {
    fontFamily: 'Poppins, Montserrat, Roboto, sans-serif',
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
