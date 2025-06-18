
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiBell, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import '../../styles/pages/JobSeeker/JobSearch.css';

import api from '../../api';

const JobSearch = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const navigate = useNavigate();

    // Theme logic
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

    // Fetch jobs from API
    useEffect(() => {
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.getJobs(searchTerm);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simple debounce
  const timer = setTimeout(fetchJobs, 300);
  return () => clearTimeout(timer);
}, [searchTerm]);

    // Format date from backend
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    
    const showJobDetails = (job) => {
        setSelectedJob(job);
        setIsDetailOpen(true);
    };

    const closeJobDetails = () => {
        setIsDetailOpen(false);
        setTimeout(() => setSelectedJob(null), 300);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={`careerplus-jobsearch-root ${theme}`}>

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
                        <button className="careerplus__nav-icon" title="Notifications" onClick={() => navigate('/notificationlist')}>
                            <FiBell />
                        </button>
                        <button className="careerplus__nav-icon" title="Account" onClick={() => navigate('/jobseekeraccount')}>
                            <FiUser />
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

            <main className="careerplus-jobsearch-main">
                <div className="job-search-page">
                    <div className="search-container">
                        <h1>Find Your Dream Job</h1>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by job title, company, or category..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-spinner">
                            {/* Add loading spinner */}
                            Loading jobs...
                        </div>
                    ) : (
                        <div className="job-listings">
                            {jobs.length > 0 ? (
                                jobs.map(job => (
                                    <div key={job.id} className="job-card">
                                        <div className="job-card-header">
                                            <h2>{job.job_title}</h2>
                                            <span className="company-name">
                                                {job.employer_name || 'Unknown Company'}
                                            </span>
                                        </div>
                                        <div className="job-card-body">
                                            <div className="job-info">
                                                <div className="info-item">
                                                    <span className="info-label">Location</span>
                                                    <span>{job.location || 'Not specified'}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Posted</span>
                                                    <span>{formatDate(job.posted_date)}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Salary</span>
                                                    <span>
                                                        {job.salary ? `$${job.salary}` : 'Negotiable'}
                                                    </span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Category</span>
                                                    <span className="category-tag">
                                                        {job.category || 'Other'}
                                                    </span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Deadline</span>
                                                    <span>{formatDate(job.deadline)}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="details-button"
                                                onClick={() => showJobDetails(job)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">
                                    <p>No jobs found matching your search criteria.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Job Details Modal */}
                    {selectedJob && (
                        <div className={`job-details-modal ${isDetailOpen ? 'open' : ''}`}>
                            <div className="modal-content">
                                <button className="close-button" onClick={closeJobDetails}>×</button>
                                <h2>{selectedJob.job_title}</h2>
                                <h3>{selectedJob.employer_name || 'Unknown Company'}</h3>

                                <div className="detail-section">
                                    <div className="detail-row">
                                        <span className="detail-label">Job ID</span>
                                        <span>{selectedJob.id}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Required Gender</span>
                                        <span>{selectedJob.required_gender || 'Any'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Required Experience</span>
                                        <span>
                                            {selectedJob.required_year || 'Not specified'}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Positions Available</span>
                                        <span>{selectedJob.quota || 1}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Salary</span>
                                        <span>
                                            {selectedJob.salary ? `$${selectedJob.salary}` : 'Negotiable'}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Deadline</span>
                                        <span>{formatDate(selectedJob.deadline)}</span>
                                    </div>
                                </div>

                                <div className="description-section">
                                    <h4>Job Description</h4>
                                    <p>{selectedJob.description || 'No description provided.'}</p>
                                </div>

                                <div className="modal-actions">
                                    <button 
                                        className="apply-button"
                                        onClick={() => navigate(`/jobapplication/${selectedJob.id}`)}
                                    >
                                        Apply Now
                                    </button>
                                    <button className="cancel-button" onClick={closeJobDetails}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* footer */}
            <motion.footer id="contact" className="careerplus__footer"
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

export default JobSearch;