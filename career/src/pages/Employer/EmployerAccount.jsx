import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiSave, FiUser, FiMail, FiPhone, FiLock, FiBriefcase, FiPlus, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/pages/Employer/EmployerAccount.css';
import JobCard from '../../components/Employer/JobCard';
import ApplicantCard from '../../components/Employer/ApplicantCard';
import CompanyDetailModal from '../../components/Employer/CompanyDetailModal';
import profileImage from '../../assets/man1.jpg';

const EmployerAccount = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return savedTheme;
    });

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

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Active tab state
    const [activeTab, setActiveTab] = useState('profile');
    
    // Profile state
    const [profile, setProfile] = useState({
        firstName: 'Abebe',
        middleName: 'Abebe',
        lastName: 'Abebe',
        age: 42,
        gender: 'Male',
        location: 'Gondar',
        email: 'Abebe.abebe@example.com',
        phoneNumber: '+(251) 9123-456',
        profilePicture: profileImage
    });

    // Company state
    const [company, setCompany] = useState({
        name: 'Tech Innovations Inc.',
        location: 'Gondar',
        yearEstablished: '2015'
    });

    // Jobs state
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: 'Senior React Developer',
            postTime: '2023-05-15',
            status: 'Approved',
            salary: '$10,000 - $15,000',
            category: 'Software Development',
            experience: '5+ years',
            quota: 2,
            deadline: '2023-06-30',
            description: 'We are looking for an experienced React developer to join our team.'
        },
        {
            id: 2,
            title: 'UX Designer',
            postTime: '2023-05-20',
            status: 'Under Review',
            salary: '$9,000 - $11,000',
            category: 'Design',
            experience: '3+ years',
            quota: 1,
            deadline: '2023-07-15',
            description: 'Join our design team to create beautiful user experiences.'
        }
    ]);

    // Applicants state
    const [applicants, setApplicants] = useState([
        {
            id: 1,
            jobId: 1,
            name: 'Abebe Abebe',
            fieldOfStudy: 'Computer Science',
            degree: 'Master',
            age: 28,
            gender: 'Female',
            location: 'Gondar',
            phoneNumber: '+(251) 9123-456',
            experience: '4 years',
            graduationYear: 2020,
            status: 'pending'
        },
        {
            id: 2,
            jobId: 1,
            name: 'Abebe abebe',
            fieldOfStudy: 'Software Engineering',
            degree: 'Bachelor',
            age: 25,
            gender: 'Male',
            location: 'Gondar',
            phoneNumber: '+(251) 9123-456',
            experience: '2 years',
            graduationYear: 2021,
            status: 'pending'
        }
    ]);

    // Modal states
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showApplicantModal, setShowApplicantModal] = useState(false);
    const [currentJobApplicants, setCurrentJobApplicants] = useState([]);
    const [editingProfile, setEditingProfile] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Handle profile changes
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    // Handle password changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    // Handle profile picture upload
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile(prev => ({ ...prev, profilePicture: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle password update
    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        console.log("Password updated successfully");
        setPasswordData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setEditingPassword(false);
    };

    // Handle profile update
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        console.log("Profile updated successfully");
        setEditingProfile(false);
    };

    // Handle applicant action
    const handleApplicantAction = (applicantId, action) => {
        setApplicants(prevApplicants =>
            prevApplicants.map(applicant =>
                applicant.id === applicantId
                    ? { ...applicant, status: action }
                    : applicant
            )
        );
        console.log(`${action}ed applicant ${applicantId}`);
    };

    // Show applicants for a specific job
    const showJobApplicants = (jobId) => {
        const jobApplicants = applicants.filter(a => a.jobId === jobId);
        setCurrentJobApplicants(jobApplicants);
        setShowApplicantModal(true);
    };

    // Toggle company modal
    const toggleCompanyModal = () => {
        setShowCompanyModal(prev => !prev);
    };

    return (
        <div className={`employer-account-container ${theme}`}>
            {/* Header */}
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
                        <button 
                            className="careerplus__nav-icon" 
                            title="Post Job" 
                            onClick={() => navigate('/employerjobposting')}
                        >
                            <FiPlus />
                        </button>
                        <button 
                            className="careerplus__nav-icon" 
                            title="Logout" 
                            onClick={handleLogout}
                        >
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

            {/* Main Content Wrapper */}
            <div className="employer-main-wrapper">
            {/* Vertical Navigation Sidebar */}
            <div className="employer-sidebar">
                <Link 
                    to="#" 
                    className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <span className="sidebar-icon">👤</span>
                    <span>Profile</span>
                </Link>
                <Link 
                    to="#" 
                    className={`sidebar-item ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    <span className="sidebar-icon">🔒</span>
                    <span>Security</span>
                </Link>
                <Link 
                    to="#" 
                    className={`sidebar-item ${activeTab === 'company' ? 'active' : ''}`}
                    onClick={() => setActiveTab('company')}
                >
                    <span className="sidebar-icon">🏢</span>
                    <span>Company</span>
                </Link>
                <Link 
                    to="#" 
                    className={`sidebar-item ${activeTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    <span className="sidebar-icon">💼</span>
                    <span>Posted Jobs</span>
                </Link>
            </div>

                {/* Main Content */}
            <div className="employer-main-content">
                {/* Profile Section */}
                {activeTab === 'profile' && (
                    <section className="profile-section">
                        <h2>Profile Summary</h2>
                        <div className="profile-content">
                            <div className="profile-picture-container">
                                <img
                                    src={profile.profilePicture}
                                    alt="Profile"
                                    className="profile-picture"
                                />
                                {editingProfile && (
                                    <div className="profile-picture-upload-container">
                                        <label htmlFor="profile-picture-upload" className="upload-label">
                                            Change Photo
                                        </label>
                                        <input
                                            id="profile-picture-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                            className="profile-picture-upload"
                                        />
                                    </div>
                                )}
                            </div>

                            {!editingProfile ? (
                                <div className="profile-details">
                                    <p><strong>Name:</strong> {profile.firstName} {profile.middleName} {profile.lastName}</p>
                                    <p><strong>Age:</strong> {profile.age}</p>
                                    <p><strong>Gender:</strong> {profile.gender}</p>
                                    <p><strong>Location:</strong> {profile.location}</p>
                                    <p><strong>Email:</strong> {profile.email}</p>
                                    <p><strong>Phone:</strong> {profile.phoneNumber}</p>
                                    <button
                                        onClick={() => setEditingProfile(true)}
                                        className="edit-profile-btn"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleProfileUpdate} className="profile-edit-form">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={profile.phoneNumber}
                                            onChange={handleProfileChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-buttons">
                                        <button type="submit" className="save-btn">Save Changes</button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingProfile(false)}
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </section>
                )}

                {/* Security Section */}
                {activeTab === 'security' && (
                    <section className="profile-section">
                        <h2>Security Settings</h2>
                        <div className="password-section">
                            {!editingPassword ? (
                                <button
                                    onClick={() => setEditingPassword(true)}
                                    className="change-password-btn"
                                >
                                    Change Password
                                </button>
                            ) : (
                                <form onSubmit={handlePasswordUpdate} className="password-form">
                                    <div className="form-group">
                                        <label>Old Password</label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            value={passwordData.oldPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-buttons">
                                        <button type="submit" className="save-btn">Update Password</button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingPassword(false)}
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </section>
                )}

                {/* Company Section */}
                {activeTab === 'company' && (
                    <section className="profile-section">
                        <h2>Company Information</h2>
                        <div className="profile-content">
                            <div className="profile-details">
                                <p><strong>Company Name:</strong> {company.name}</p>
                                <p><strong>Location:</strong> {company.location}</p>
                                <p><strong>Year Established:</strong> {company.yearEstablished}</p>
                                <button
                                    onClick={toggleCompanyModal}
                                    className="company-details-btn"
                                >
                                    View/Edit Company Details
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Posted Jobs Section */}
                {activeTab === 'jobs' && (
                    <section className="jobs-section">
                        <h2>My Posted Jobs</h2>
                        <div className="jobs-list">
                            {jobs.map(job => {
                                const jobApplicants = applicants.filter(a => a.jobId === job.id);
                                return (
                                    <div key={job.id} className="job-card">
                                        <h3>{job.title}</h3>
                                        <p><strong>Status:</strong> {job.status}</p>
                                        <p><strong>Salary:</strong> {job.salary}</p>
                                        <p><strong>Deadline:</strong> {job.deadline}</p>
                                        <button 
                                            onClick={() => showJobApplicants(job.id)}
                                            className="view-applicants-btn"
                                        >
                                            View Applicants
                                            <span className="applicant-count-badge">
                                                {jobApplicants.length}
                                            </span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
            </div>

            {/* Footer */}
            <motion.footer 
                className="careerplus__footer"
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
                        <a href="/employeraccount" className="careerplus__footer-link">Account</a>
                        <a href="/employerjobposting" className="careerplus__footer-link">Post Job</a>
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

            {/* Company Details Modal */}
            {showCompanyModal && (
                <div className="company-modal">
                    <div className="company-modal-content">
                        <CompanyDetailModal
                            company={company}
                            onClose={toggleCompanyModal}
                        />
                    </div>
                </div>
            )}

            {/* Applicants Modal */}
            {showApplicantModal && (
                <div className="applicant-modal">
                    <div className="applicant-modal-content">
                        <div className="applicant-modal-header">
                            <h3>Applicants</h3>
                            <button 
                                onClick={() => setShowApplicantModal(false)}
                                className="close-modal-btn"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="applicants-list">
                            {currentJobApplicants.map(applicant => (
                                <ApplicantCard
                                    key={applicant.id}
                                    applicant={applicant}
                                    onAccept={() => handleApplicantAction(applicant.id, 'accepted')}
                                    onReject={() => handleApplicantAction(applicant.id, 'rejected')}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployerAccount;