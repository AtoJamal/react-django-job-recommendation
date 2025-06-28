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

// Admin Imports
import AdminEmployerList from '../pages/Admin/AdminEmployerList';
import AdminProfile from '../pages/Admin/AdminProfile';
import AdminFeedbackDetail from '../pages/Admin/AdminFeedbackDetail';
import AdminFeedbackList from '../pages/Admin/AdminFeedbackList';
import AdminJobSeekerList from '../pages/Admin/AdminJobSeekerList';
import AdminPostedJobDetail from '../pages/Admin/AdminPostedJobDetail';
import AdminPostedJobList from '../pages/Admin/AdminPostedJobList';

// import ProtectedRoute

import JobSeekersList from '../testJobSeekersList';
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
        <Route path="/jobseekeraccount" element={ <JobSeekerAccount />} />
        <Route path="/jobsearch" element={<JobSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notificationlist" element={<NotificationList />} />
        <Route path="/jobapplication" element={<JobApplication />} />
        <Route path="/employeraccount" element={<EmployerAccount />} />
        <Route path="/employerjobposting" element={<EmployerJobPosting />} />
        <Route path="/jobseekerslist" element={<JobSeekersList />} />

        <Route path="/jobs/:jobId/apply" element={<JobApplication />} />
    </Routes>



);

export default AppRoutes;


