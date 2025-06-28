import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Axios instance for API calls with token handling
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add access token
authApi.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const user = localStorage.getItem('user');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Attempt to refresh token if it's expired or near expiration (simple check)
    // This part requires a more robust token expiration check than just presence.
    // For a simple example, we'll assume if an authenticated request fails with 401, refresh.
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle token refresh on 401 errors
authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Avoid infinite loop for refresh token endpoint itself
        if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== `${API_BASE_URL}/token/refresh/`) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error("No refresh token available. Please log in.");
                }
                const res = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                    refresh: refreshToken
                });
                localStorage.setItem('access_token', res.data.access);
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return authApi(originalRequest); // Retry the original request with new token
            } catch (refreshError) {
                console.error("Token refresh failed, forcing logout:", refreshError);
                localStorage.clear(); // Clear all tokens
                window.location.href = '/login'; // Redirect to login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Function to load user from localStorage
    const loadUserFromStorage = useCallback(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const accessToken = localStorage.getItem('access_token');
            if (storedUser && accessToken) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Failed to load user from localStorage:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load and listen to storage changes
    useEffect(() => {
        loadUserFromStorage();

        const handleStorageChange = () => {
            loadUserFromStorage();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [loadUserFromStorage]);

    const login = useCallback((userData, accessToken, refreshToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.clear(); // Clears all auth-related items
        setUser(null);
        setIsAuthenticated(false);
        // Navigate explicitly to login might be needed in App.jsx or main router logic
    }, []);

    // Provide the combined user type for convenience
    const userType = user?.user_type || null;

    const authContextValue = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        userType,
        jobSeekerId: userType === 'jobseeker' ? user?.id : null, // Assuming user.id is the jobseeker_id
        employerId: userType === 'employer' ? user?.id : null,   // Assuming user.id is the employer_id
        api: authApi // Export the configured axios instance
    };

    if (loading) {
        return <div>Loading authentication...</div>; // Or a simple spinner
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
