import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Auto/Login';
import Register from '../pages/Auto/Register';
// JobSeeker Imports

import Welcome from '../pages/JobSeeker/Welcome';
import JobApplication from '../pages/JobSeeker/JobApplication';

import NotificationList from '../pages/JobSeeker/NotificationList';
import NotificationDetail from '../pages/JobSeeker/NotificationDetail';

import JobSeekerAccount from '../pages/JobSeeker/JobSeekerAccount';
import JobSearch from '../pages/JobSeeker/JobSearch';
import Resume from '../pages/JobSeeker/Resume';
// Employer Imports

import EmployerAccount from '../pages/Employer/EmployerAccount';
import EmployerJobPosting from '../pages/Employer/EmployerJobPosting';
import DepartmentForm from '../pages/Employer/DepartmentForm';
// Admin Imports
import AdminEmployerList from '../pages/Admin/AdminEmployerList';
import AdminProfile from '../pages/Admin/AdminProfile';
import AdminFeedbackDetail from '../pages/Admin/AdminFeedbackDetail';
import AdminFeedbackList from '../pages/Admin/AdminFeedbackList';
import AdminJobSeekerList from '../pages/Admin/AdminJobSeekerList';
import AdminPostedJobDetail from '../pages/Admin/AdminPostedJobDetail';
import AdminPostedJobList from '../pages/Admin/AdminPostedJobList';

// import ProtectedRoute
import ProtectedRoute from '../components/ProtectedRoute';
import App from '../App';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}


const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/jobseekeraccount" element={ <ProtectedRoute><JobSeekerAccount /></ProtectedRoute> } />
        <Route path="/jobsearch" element={<JobSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notificationlist" element={<ProtectedRoute><NotificationList /></ProtectedRoute>} />
        <Route path="/jobapplication" element={<ProtectedRoute><JobApplication /></ProtectedRoute>} />
        <Route path="/employeraccount" element={<ProtectedRoute><EmployerAccount /></ProtectedRoute>} />
        <Route path="/employerjobposting" element={<ProtectedRoute><EmployerJobPosting /></ProtectedRoute>} />
        
    </Routes>



);

export default AppRoutes;


