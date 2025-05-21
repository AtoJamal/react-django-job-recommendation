// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for error handling and token management
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default {
  // Registration endpoints
  createJobSeeker: (data) => api.post('/register/jobseeker/', data),
  createEmployer: (data) => api.post('/register/employer/', data),
  // Login endpoints
  loginJobSeeker: (data) => api.post('/login/jobseeker/', data),
  loginEmployer: (data) => api.post('/login/employer/', data),
  
  // Existing endpoints
  getAdmins: () => api.get('/admins/'),
  getEmployers: () => api.get('/employers/'),
  getJobSeekers: () => api.get('/jobseekers/'),
  getJobs: () => api.get('/jobs/'),
  getApplications: () => api.get('/applications/'),
  
  // Add more endpoints as needed
};