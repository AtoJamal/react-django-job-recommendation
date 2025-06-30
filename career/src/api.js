// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for error handling and token management
api.interceptors.request.use((config) => {
    // Skip auth for registration and login endpoints
    const isPublicEndpoint = config.url.includes('register/') || config.url.includes('login/');
    if (!isPublicEndpoint) {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
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
  // Registration endpoints (public, no auth needed)
  createJobSeeker: (data) => {
    return api.post('/register/jobseeker/', data);
  },
  createEmployer: (data) => {
    return api.post('/register/employer/', data);
  },
  // Login endpoints (public, no auth needed)
  loginJobSeeker: (data) => {
    return api.post('/login/jobseeker/', data);
  },
  loginEmployer: (data) => {
    return api.post('/login/employer/', data);
  },
  // Protected endpoints (require auth)
  getAdmins: () => api.get('/admins/'),
  getEmployers: () => api.get('/employers/'),
  getJobSeekers: () => api.get('/jobseekers/'),
  getApplications: () => api.get('/applications/'),
  postJob: (data) => api.post('/jobs/', data),
  getJobSeekerProfile: () => api.get('/jobseekers/me/'),
  updateJobSeekerProfile: (data) => api.patch('/jobseekers/me/', data),
  updateJob: (id, data) => api.patch(`/jobs/${id}/`, data),
  getJobs: (searchTerm) => api.get('/jobs/', {
    params: {
      search: searchTerm || '' 
    }
  }),
  verifyAuth: () => api.get('/auth/verify/'),
  getJobSeekerResume: (userId) => api.get(`/jobseekers/${userId}/resume/`),
  submitApplication: (data) => {
    return api.post('/applications/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    });
},
  getJobDetails: (jobId) => api.get(`/jobs/${jobId}/`),
};