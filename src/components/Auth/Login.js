// src/components/Auth/Login.js
import React, { useState } from 'react';
import authService from '../../services/authService';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';

/**
 * Renders a login form component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onLogin - The callback function to be called when the user logs in successfully.
 * @returns {JSX.Element} The login form component.
 */
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  /**
   * Handles the form submission.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages([]); // Clear existing errors before the new login attempt
    try {
      const token = await authService.login(email, password);
      onLogin(token);
    } catch (error) {
      // Handle the different types of errors here
      if (error.response) {
        // Handle validation errors from the server
        if (Array.isArray(error.response.data.detail)) {
          setErrorMessages(error.response.data.detail.map((e, index) => `${e.msg} (${index})`));
        } else {
          // Handle single error message from the server
          setErrorMessages([error.response.data.detail]);
        }
      } else {
        // Handle network error or error without a response
        setErrorMessages(['Network error or no error response.']);
      }
    }
  };

  // Render the login form  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorMessages.length > 0 && (
            <Box mt={2}>
              {errorMessages.map((error, index) => (
                <Alert key={error} severity="error" sx={{ mb: 2 }}> {error}
                </Alert>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

// Export the login form component
export default Login;
