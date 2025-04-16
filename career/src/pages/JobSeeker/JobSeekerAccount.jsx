import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiSave, FiDownload, FiTrash2, FiUser, FiMail, FiPhone, FiLock, FiBriefcase } from 'react-icons/fi';
import ProfileCard from '../../components/JobSeeker/ProfileCard';
import SecurityForm from '../../components/JobSeeker/SecurityForm';
import AppliedJobList from '../../components/JobSeeker/AppliedJobList';
import defaultProfile from '../../assets/man1.jpg';
import '../../styles/pages/JobSeeker/JobSeekerAccount.css';

import logoImage from '../../assets/image-3.png'

const JobSeekerAccount = () => {
    const [profile, setProfile] = useState({
        firstName: 'Abebe',
        middleName: 'Abebe',
        lastName: 'Abebe',
        email: 'abebe.Abebe@example.com',
        age: 28,
        gender: 'Male',
        phone: '+1 (555) 123-4567',
        degree: 'Master of Science',
        fieldOfStudy: 'Computer Science',
        profilePic: defaultProfile,
        resumeUrl: logoImage
    });

    const [appliedJobs, setAppliedJobs] = useState([
        {
            id: 1,
            title: 'Senior UX Designer',
            company: 'TechCorp Inc.',
            appliedDate: '2023-05-15',
            status: 'Under Review',
            logo: logoImage
        },
        {
            id: 2,
            title: 'Product Manager',
            company: 'Innovate Solutions',
            appliedDate: '2023-06-02',
            status: 'Interview Scheduled',
            logo: logoImage
        },
        {
            id: 3,
            title: 'Frontend Developer',
            company: 'WebCraft Studios',
            appliedDate: '2023-06-10',
            status: 'Rejected',
            logo: logoImage
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
        console.log('Account deleted');
        setShowDeleteConfirm(false);
    };

    const statusColors = {
        'Under Review': '#3b82f6',
        'Interview Scheduled': '#10b981',
        'Rejected': '#ef4444',
        'Offer Received': '#8b5cf6'
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
        </motion.div>
    );
};

export default JobSeekerAccount;