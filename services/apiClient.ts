import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Explicitly point to the backend server
});

// Interceptor to add the JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const token = JSON.parse(userInfo).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // For example, log out the user and redirect to login
      localStorage.removeItem('userInfo');
      // This is a simple way to force a reload and redirect.
      // In a more complex app, you might use a history object from react-router.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default apiClient;