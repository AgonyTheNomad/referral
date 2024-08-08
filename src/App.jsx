import React from 'react';
import SimpleForm from './components/SimpleForm';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0095eb',
    },
    secondary: {
      main: '#FF6600', // This orange color will be used for the button
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SimpleForm />
    </ThemeProvider>
  );
}

export default App;