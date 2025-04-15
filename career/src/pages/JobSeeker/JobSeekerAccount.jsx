import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiSave, FiDownload, FiTrash2, FiChevronDown, FiUser, FiMail, FiLock } from 'react-icons/fi';
import ProfileCard from '../../components/JobSeeker/ProfileCard';
import EditableForm from '../../components/JobSeeker/EditableForm';
import AppliedJobList from '../../components/JobSeeker/AppliedJobList';
import defaultProfile from '../../assets/react.svg';
import '../../styles/pages/JobSeeker/JobSeekerAccount.css';


const JobSeekerAccount = () => {
    const [profile, setProfile] = useState({
        name: 'Jemal Hussen',
        email: 'jemal.hussen@example.com',
        profilePic: defaultProfile,
        resumeUrl: '/resumes/jemal-hussen-resume.pdf'
    });

    const [appliedJobs, setAppliedJobs] = useState([
        {
            id: 1,
            title: 'Senior UX Designer',
            company: 'TechCorp Inc.',
            appliedDate: '2023-05-15',
            status: 'Under Review',
            logo: '/company-logos/techcorp.webp'
        },
        {
            id: 2,
            title: 'Product Manager',
            company: 'Innovate Solutions',
            appliedDate: '2023-06-02',
            status: 'Interview Scheduled',
            logo: '/company-logos/innovate.webp'
        },
        {
            id: 3,
            title: 'Frontend Developer',
            company: 'WebCraft Studios',
            appliedDate: '2023-06-10',
            status: 'Rejected',
            logo: '/company-logos/webcraft.webp'
        }
    ]);

    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleUpdateProfile = (updatedData) => {
        setProfile({ ...profile, ...updatedData });
        setIsEditing(false);
    };

    const handleDeleteAccount = () => {
        // Account deletion logic would go here
        console.log('Account deleted');
        setShowDeleteConfirm(false);
    };

    const statusColors = {
        'Under Review': '#3b82f6', // blue
        'Interview Scheduled': '#10b981', // green
        'Rejected': '#ef4444', // red
        'Offer Received': '#8b5cf6' // purple
    };

    return (
        <motion.div
            className="job-seeker-account"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
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
                        <FiMail className="sidebar-icon" />
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
                                            onClick={() => console.log('Download resume')}
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
                                <h2 className="section-title">My Applications</h2>
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

                                <div className="security-card">
                                    <h3>Change Password</h3>
                                    <form className="password-form">
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <input type="password" />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="password" />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm New Password</label>
                                            <input type="password" />
                                        </div>
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="save-btn"
                                        >
                                            <FiSave /> Update Password
                                        </motion.button>
                                    </form>
                                </div>

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
        </motion.div>
    );
};

export default JobSeekerAccount;