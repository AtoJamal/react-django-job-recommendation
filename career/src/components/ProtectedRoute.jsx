import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import from the new AuthContext

/**
 * ProtectedRoute component to guard routes requiring authentication.
 *
 * @param {object} props
 * @param {string[]} [props.allowedUserTypes] - Optional array of user types allowed ('jobseeker', 'employer', 'admin').
 * If not provided, any authenticated user can access.
 * @returns {JSX.Element} The child route elements if authenticated and authorized,
 * otherwise redirects to the login page.
 */
const ProtectedRoute = ({ allowedUserTypes }) => {
    const { isAuthenticated, loading, user, logout } = useAuth();

    if (loading) {
        // Render a loading state while authentication status is being determined
        return <div>Loading session...</div>;
    }

    if (!isAuthenticated) {
        // Not authenticated, redirect to login page
        // Preserve current location to redirect back after successful login
        return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
    }

    // If allowedUserTypes are specified, check if the user's type is included
    if (allowedUserTypes && allowedUserTypes.length > 0) {
        if (!user || !user.user_type || !allowedUserTypes.includes(user.user_type)) {
            console.warn(`Access denied. User type "${user?.user_type}" is not allowed for this route (requires one of: ${allowedUserTypes.join(', ')}).`);
            logout(); // Log out unauthorized user for this route
            // Redirect to login with an error message
            return <Navigate to="/login" replace state={{ error: "Unauthorized access or incorrect user type. Please log in with the correct account." }} />;
        }
    }

    // User is authenticated and, if applicable, is the correct user type
    return <Outlet />;
};

export default ProtectedRoute;
