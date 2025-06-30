import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiSave, FiDownload, FiTrash2, FiUser, FiMail, FiPhone, FiLock, FiBriefcase, FiSearch, FiBell, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/JobSeeker/ProfileCard';
import SecurityForm from '../../components/JobSeeker/SecurityForm';
import AppliedJobList from '../../components/JobSeeker/AppliedJobList';
import defaultProfile from '../../assets/man1.jpg';
import '../../styles/pages/JobSeeker/JobSeekerAccount.css';
import api from '../../api';

const JobSeekerAccount = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return savedTheme;
    });

    const [profile, setProfile] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile using the new endpoint
                const profileResponse = await api.getJobSeekerProfile();
                const profileData = profileResponse.data;

                setProfile({
                    firstName: profileData.first_name,
                    middleName: profileData.middle_name || '',
                    lastName: profileData.last_name,
                    email: profileData.email,
                    age: profileData.age,
                    gender: profileData.gender,
                    phone: profileData.phone_number,
                    degree: profileData.degree,
                    fieldOfStudy: profileData.field_of_study,
                    profilePic: defaultProfile,
                    resumeUrl: null
                });

                // Fetch applications
                const jobsResponse = await api.getApplications();
                setAppliedJobs(jobsResponse.data.map(job => ({
                    id: job.id,
                    title: job.job?.job_title || 'No title',
                    company: job.job?.employer?.company?.name || 'Unknown Company',
                    appliedDate: job.application_time,
                    status: job.status,
                    logo: null
                })));

            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleUpdateProfile = async (updatedData) => {
        try {
            // Here you would make an API call to update the profile
            // For now, we'll just update the local state
            setProfile(prev => ({ ...prev, ...updatedData }));
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            // Here you would make an API call to delete the account
            console.log('Account deleted');
            setShowDeleteConfirm(false);
            handleLogout();
        } catch (err) {
            console.error('Error deleting account:', err);
        }
    };

    const statusColors = {
        'pending': '#3b82f6',
        'approved': '#10b981',
        'rejected': '#ef4444',
        'interview_scheduled': '#8b5cf6'
    };

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    if (!profile) {
        return <div className="error-container">No profile data found</div>;
    }

    return (
        <div className={`job-seeker-account ${theme}`}>
            {/* Header - unchanged */}
            <motion.header
                className={`careerplus__header ${scrolled ? 'scrolled' : ''}`}
                initial={{ backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
                animate={{
                    backgroundColor: scrolled
                        ? (theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)')
                        : (theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)')
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="careerplus__header-container">
                    <motion.h1
                        className="careerplus__logo"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        CareerPlus
                    </motion.h1>
                    <nav className="careerplus__nav">
                        <button className="careerplus__nav-icon" title="Search Jobs" onClick={() => navigate('/jobsearch')}>
                            <FiSearch />
                        </button>
                        <button className="careerplus__nav-icon" title="Notifications" onClick={() => navigate('/notificationlist')}>
                            <FiBell />
                        </button>
                        <button className="careerplus__nav-icon" title="Logout" onClick={handleLogout}>
                            <FiLogOut />
                        </button>
                        <button
                            className="careerplus__theme-toggle"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                        >
                            {theme === 'light' ? <FiMoon /> : <FiSun />}
                        </button>
                    </nav>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="account-container">
                {/* Sidebar Navigation */}
                <div className="account-sidebar">
                    <motion.div
                        className={`sidebar-item ${activeSection === 'profile' ? 'active' : ''}`}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setActiveSection('profile')}
                    >
                        <FiUser className="sidebar-icon" />
                        <span>Profile</span>
                    </motion.div>

                    <motion.div
                        className={`sidebar-item ${activeSection === 'applications' ? 'active' : ''}`}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setActiveSection('applications')}
                    >
                        <FiBriefcase className="sidebar-icon" />
                        <span>Applications</span>
                    </motion.div>

                    <motion.div
                        className={`sidebar-item ${activeSection === 'security' ? 'active' : ''}`}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setActiveSection('security')}
                    >
                        <FiLock className="sidebar-icon" />
                        <span>Security</span>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="account-content">
                    {/* Profile Section */}
                    <AnimatePresence>
                        {activeSection === 'profile' && (
                            <motion.section
                                key="profile"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="profile-section"
                            >
                                <h2 className="section-title">My Profile</h2>

                                <ProfileCard
                                    profile={profile}
                                    isEditing={isEditing}
                                    onEditToggle={() => setIsEditing(!isEditing)}
                                />

                                <div className="profile-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Full Name:</span>
                                        <span className="detail-value">{`${profile.firstName} ${profile.middleName} ${profile.lastName}`}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Email:</span>
                                        <span className="detail-value">{profile.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Age:</span>
                                        <span className="detail-value">{profile.age}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Gender:</span>
                                        <span className="detail-value">{profile.gender}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Phone:</span>
                                        <span className="detail-value">{profile.phone}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Degree:</span>
                                        <span className="detail-value">{profile.degree}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Field of Study:</span>
                                        <span className="detail-value">{profile.fieldOfStudy}</span>
                                    </div>
                                </div>

                                {isEditing ? (
                                    <EditableForm
                                        profile={profile}
                                        onSave={handleUpdateProfile}
                                        onCancel={() => setIsEditing(false)}
                                    />
                                ) : (
                                    <div className="action-buttons">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="download-btn"
                                        >
                                            <FiDownload /> Download Resume
                                        </motion.button>
                                    </div>
                                )}
                            </motion.section>
                        )}
                    </AnimatePresence>

                    {/* Applications Section */}
                    <AnimatePresence>
                        {activeSection === 'applications' && (
                            <motion.section
                                key="applications"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="applications-section"
                            >
                                <h2 className="section-title">My Job Applications</h2>
                                <AppliedJobList jobs={appliedJobs} statusColors={statusColors} />
                            </motion.section>
                        )}
                    </AnimatePresence>

                    {/* Security Section */}
                    <AnimatePresence>
                        {activeSection === 'security' && (
                            <motion.section
                                key="security"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="security-section"
                            >
                                <h2 className="section-title">Account Security</h2>
                                <SecurityForm />

                                <div className="danger-zone">
                                    <h3>Danger Zone</h3>
                                    <p>Permanently delete your account and all associated data</p>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="delete-btn"
                                        onClick={() => setShowDeleteConfirm(true)}
                                    >
                                        <FiTrash2 /> Delete Account
                                    </motion.button>

                                    <AnimatePresence>
                                        {showDeleteConfirm && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="delete-confirm"
                                            >
                                                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                                                <div className="confirm-buttons">
                                                    <button
                                                        className="cancel-btn"
                                                        onClick={() => setShowDeleteConfirm(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="confirm-delete-btn"
                                                        onClick={handleDeleteAccount}
                                                    >
                                                        Yes, Delete
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer - unchanged */}
            <motion.footer className="careerplus__footer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="careerplus__footer-container">
                    <div className="careerplus__footer-brand">
                        <h3 className="careerplus__logo">CareerPlus</h3>
                        <p className="careerplus__footer-text">
                            AI-powered job matching for the modern professional.
                        </p>
                    </div>
                    <div className="careerplus__footer-links">
                        <h4 className="careerplus__footer-heading">Quick Links</h4>
                        <a href="/" className="careerplus__footer-link">Home</a>
                        <a href="/jobseekeraccount" className="careerplus__footer-link">Account</a>
                        <a href="/notificationlist" className="careerplus__footer-link">Notifications</a>
                    </div>
                    <div className="careerplus__footer-contact">
                        <h4 className="careerplus__footer-heading">Contact Us</h4>
                        <p className="careerplus__footer-text">hello@careerplus.com</p>
                        <p className="careerplus__footer-text">+251 (9) 123-456</p>
                    </div>
                    <div className="careerplus__footer-social">
                        <h4 className="careerplus__footer-heading">Follow Us</h4>
                        <div className="careerplus__social-icons">
                            <a href="#" className="careerplus__social-icon"><FaLinkedin /></a>
                            <a href="#" className="careerplus__social-icon"><FaTwitter /></a>
                            <a href="#" className="careerplus__social-icon"><FaGithub /></a>
                        </div>
                    </div>
                </div>
                <div className="careerplus__footer-bottom">
                    <p>&copy; {new Date().getFullYear()} CareerPlus. All rights reserved.</p>
                </div>
            </motion.footer>
        </div>
    );
};

export default JobSeekerAccount;