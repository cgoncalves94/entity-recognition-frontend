import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';
import authService from '../../services/authService';

function Register({onRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessages(['Passwords do not match.']);
      return;
    }
    setErrorMessages([]);
    try {
      const registeredEmail = await authService.register(email, password);
      alert(`Registration successful for ${registeredEmail}. Please log in.`);
      onRegistered(); // Call the onRegistered callback after successful registration
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data.detail)) {
          setErrorMessages(error.response.data.detail.map((e) => e.msg));
        } else {
          setErrorMessages([error.response.data.detail]);
        }
      } else {
        setErrorMessages(['Network error or no error response.']);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Email and Password TextFields */}
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {/* Error message display */}
          {errorMessages.length > 0 && (
            <Box mt={2}>
              {errorMessages.map((error, index) => (
                <Alert key={error} severity="error">{error}</Alert>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
