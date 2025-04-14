import { Routes, Route } from 'react-router-dom';
import React from 'react';
// JobSeeker Imports

import Welcome from '../pages/JobSeeker/Welcome';
import Regiter from '../pages/JobSeeker/Register';
import NotificationList from '../pages/JobSeeker/NotificationList';
import NotificationDetail from '../pages/JobSeeker/NotificationDetail';
import Login from '../pages/JobSeeker/Login';
import JobSeekerAccount from '../pages/JobSeeker/JobSeekerAccount';
import JobList from '../pages/JobSeeker/JobList';
import JobDetail from '../pages/JobSeeker/JobDetail';
import Register from '../pages/JobSeeker/Register';
import RegisterJobSeeker from '../pages/JobSeeker/RegisterJobSeeker';
import Resume from '../pages/JobSeeker/Resume';
// Employer Imports
import EmployerApplicantList from '../pages/Employer/EmployerApplicantList';
import EmployerApplicantDetail from '../pages/Employer/EmployerApplicantDetail';
import EmployerAccount from '../pages/Employer/EmployerAccount';
import EmployerJobPosting from '../pages/Employer/EmployerJobPosting';
import EmployerPostedJobDetail from '../pages/Employer/EmployerPostedJobDetail';
import EmployerPostedJobList from '../pages/Employer/EmployerPostedJobList';
import EmployerRegister from '../pages/Employer/EmployerRegister';
// Admin Imports
import AdminEmployerList from '../pages/Admin/AdminEmployerList';
import AdminProfile from '../pages/Admin/AdminProfile';
import AdminFeedbackDetail from '../pages/Admin/AdminFeedbackDetail';
import AdminFeedbackList from '../pages/Admin/AdminFeedbackList';
import AdminJobSeekerList from '../pages/Admin/AdminJobSeekerList';
import AdminPostedJobDetail from '../pages/Admin/AdminPostedJobDetail';
import AdminPostedJobList from '../pages/Admin/AdminPostedJobList';
import App from '../App';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Welcome />} />
    </Routes>



);

export default AppRoutes;


