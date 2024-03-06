// src/App.js
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import AuthPage from './pages/AuthPage';
import NLPPage from './pages/TextSubmissionPage';
import authService from './services/authService';

// Create a theme instance
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

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [token, setToken] = useState(null);

  // Check for a stored token when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Handle the login event
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  // Handle the logout event
  const handleLogout = async () => {
    try {
      await authService.logout();
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Render the application
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {!token ? (
          <AuthPage onLogin={handleLogin} />
        ) : (
          <NLPPage token={token} onLogout={handleLogout} />
        )}
      </div>
    </ThemeProvider>
  );
}

// Export the App component
export default App;