// src/services/authService.js
import axios from 'axios';

const authService = {
  login: async (email, password) => {
    try {
      // Ensure the payload matches the backend's expected format
      const response = await axios.post('http://127.0.0.1:8000/auth/users/tokens', {
        email, // Use email here instead of username
        password,
      });
      return response.data.access_token; // Assuming the token is returned directly for simplicity
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
