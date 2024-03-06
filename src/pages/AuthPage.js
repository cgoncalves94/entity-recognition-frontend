// src/pages/AuthPage.js
import React, { useState } from 'react';
import { Login, Register } from '../components/Auth';
import { Box, Button } from '@mui/material';

/**
 * Renders the authentication page.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onLogin - The function to be called when the user logs in.
 * @returns {JSX.Element} The rendered authentication page.
 */
function AuthPage({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);

  // Handle the registration success event
  const handleRegistrationSuccess = () => {
    setIsRegistering(false);
  };

  // Render the authentication page
  return (
    <>
      {isRegistering ? (
        <Register onLogin={onLogin} onRegistered={handleRegistrationSuccess} />
      ) : (
        <Login onLogin={onLogin} />
      )}
      <Box textAlign="center" mt={2}>
        <Button onClick={() => setIsRegistering(!isRegistering)} color="inherit">
          {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
        </Button>
      </Box>
    </>
  );
}

// Export the AuthPage component
export default AuthPage;