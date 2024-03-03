// src/components/Auth/Login.js
import React, { useState } from 'react';
import authService from '../../services/authService';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await authService.login(email, password);
      onLogin(token);
    } catch (error) {
      if (error.response) {
        // General error (e.g., incorrect credentials)
        if (typeof error.response.data.detail === 'string') {
          setErrorMessages([error.response.data.detail]);
        }
        // Array of errors (e.g., validation errors)
        else if (Array.isArray(error.response.data.detail)) {
          setErrorMessages(error.response.data.detail.map(e => e.msg));
        } else {
          // If the error data is not in the expected format, show a generic message
          setErrorMessages(['An unexpected error occurred.']);
        }
      } else {
        // Network error or error without a response
        setErrorMessages(['Network error or no error response.']);
      }
    }
  };

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
              {errorMessages.map((msg, index) => (
                <Alert key={msg} severity="error" sx={{ mb: 2 }}>
                {msg}
                </Alert>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
