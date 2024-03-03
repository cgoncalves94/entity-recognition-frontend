// src/App.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Login from './components/Auth/Login';
import TextSubmission from './components/NLP/TextSubmission';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#fff',
    },
  },
});

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides a consistent baseline style */}
      <div>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <TextSubmission token={token} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
