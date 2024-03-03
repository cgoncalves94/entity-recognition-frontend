import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth/users";


// Add an interceptor to handle automatic token refresh on 401 response
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // Check if the request was for the login or refresh token endpoint
      if (originalRequest.url.endsWith('/tokens') || originalRequest.url.endsWith('/login')) {
        // It's a login or refresh token request, so don't retry
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.put(`${API_URL}/tokens`, {}, { withCredentials: true });
        localStorage.setItem('token', refreshResponse.data.access_token);
        // Update the header and resend the original request
        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.access_token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const authService = {
  login: async (email, password) => {
    try {
      // The withCredentials option tells axios to send cookies from the origin
      const response = await axios.post(`${API_URL}/tokens`, {
        email,
        password,
      }, {
        withCredentials: true
      });
      // Store only the access token in local storage
      localStorage.setItem("token", response.data.access_token);
      // Do not store the refresh token; it is handled automatically by the browser
      return response.data.access_token;
    } catch (error) {
      throw error;
    }
  },

  // This method might be unnecessary if the interceptor handles the token refresh
  refresh: async () => {
    try {
      const response = await axios.put(`${API_URL}/tokens`, {}, { withCredentials: true });
      localStorage.setItem('token', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
      try {
          await axios.delete(`${API_URL}/tokens`, {
              withCredentials: true
          });
          localStorage.removeItem("token");
      } catch (error) {
          console.error("Failed to logout:", error);
      }
    },
};

export default authService;
