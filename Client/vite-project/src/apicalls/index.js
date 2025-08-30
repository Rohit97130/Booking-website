
import axios from 'axios';  



const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

// Always set the latest token for every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;

