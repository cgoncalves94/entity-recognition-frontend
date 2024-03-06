// src/components/Auth/Register.js
import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Container,
    Typography,
    Box,
    Alert,
    IconButton, 
    InputAdornment 
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import authService from "../../services/authService";

/**
 * Renders a registration form component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onRegistered - The callback function to be called when registration is successful.
 * @returns {JSX.Element} The rendered registration form component.
 */
function Register({ onRegistered }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [countdown, setCountdown] = useState(3); // Countdown starts at
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Use useEffect to start the countdown when showSuccessAlert is true
    useEffect(() => {
        let timer;
        // Start countdown when showSuccessAlert is true
        if (showSuccessAlert) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        // Redirect when countdown reaches 0
        if (countdown === 0) {
            onRegistered();
        }
        // Clear interval on cleanup
        return () => clearInterval(timer);
    }, [showSuccessAlert, countdown, onRegistered]);

    // Handle the OK button click on the success alert
    const handleOkClick = () => {
        setShowSuccessAlert(false); // Hide the alert
        onRegistered(); // Redirect immediately
    };

    /**
     * Handles the form submission for user registration.
     *
     * @param {Event} event - The form submission event.
     * @returns {Promise<void>} - A promise that resolves when the registration is successful.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessages(["Passwords do not match."]);
            return;
        }
        setErrorMessages([]);
        try {
            await authService.register(email, password);
            setShowSuccessAlert(true); // This line was missing. Add this to show the alert.
            // Start a timeout to redirect after 3 seconds
            setTimeout(() => onRegistered(), 3000);
        } catch (error) {
            if (error.response) {
                if (Array.isArray(error.response.data.detail)) {
                    setErrorMessages(
                        error.response.data.detail.map((e) => e.msg)
                    );
                } else {
                    setErrorMessages([error.response.data.detail]);
                }
            } else {
                setErrorMessages(["Network error or no error response."]);
            }
        }
    };

    // Render the registration form
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />               
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Register
                    </Button>
                    {/* Error message display */}
                    {errorMessages.length > 0 && (
                        <Box mt={2}>
                            {errorMessages.map((error, index) => (
                                <Alert key={error} severity="error">
                                    {error}
                                </Alert>
                            ))}
                        </Box>
                    )}
                </Box>
                {showSuccessAlert && (
                    <Alert
                        severity="success"
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                onClick={handleOkClick}>
                                OK
                            </Button>
                        }>
                        Registration successful. Redirecting in {countdown}{" "}
                        seconds...
                    </Alert>
                )}
            </Box>
        </Container>
    );
}

// Export the Register component
export default Register;
