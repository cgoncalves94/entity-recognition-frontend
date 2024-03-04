import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, Button, Box } from "@mui/material";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TextSubmission from "./components/NLP/TextSubmission";
import authService from "./services/authService";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#fff",
    },
  },
});

function App() {
  const [token, setToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setToken(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // New function to handle successful registration
  const handleRegistrationSuccess = () => {
    setIsRegistering(false); // Redirect user to the login form
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {!token ? (
          <>
            {isRegistering ? (
              <Register onLogin={handleLogin} onRegistered={handleRegistrationSuccess} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
            <Box textAlign="center" mt={2}>
              <Button onClick={() => setIsRegistering(!isRegistering)} color="inherit">
                {isRegistering ? "Already have an account? Log in" : "Need an account? Register"}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
            <TextSubmission token={token} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
