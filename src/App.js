import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, Button } from "@mui/material";
import Login from "./components/Auth/Login";
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

    useEffect(() => {
        // Check for token in localStorage when the component mounts
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
        // Optionally add more error handling, such as redirecting to the login page
      }
    };
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Provides a consistent baseline style */}
            <div>
                {!token ? (
                    <Login onLogin={handleLogin} />
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
