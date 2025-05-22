import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiBell, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import '../../styles/pages/JobSeeker/JobSearch.css';

const JobSearch = () => {
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
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Mock job data
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'Addis Ababa, (Remote)',
            postedDate: '2023-06-15',
            salary: '$9,000 - $12,000',
            category: 'Software Development',
            deadline: '2023-07-15',
            description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces using React.js and implementing responsive designs.',
            requiredYear: '3+ years',
            quota: 2
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'Creative Solutions',
            location: 'Dessie, ALM',
            postedDate: '2023-06-10',
            salary: '$8,000 - $11,000',
            category: 'Design',
            deadline: '2023-07-10',
            description: 'Join our design team to create beautiful and functional user experiences. You will work closely with product managers and developers to implement design systems.',
            requiredYear: '2+ years',
            quota: 1
        },
        {
            id: 3,
            title: 'Data Scientist',
            company: 'Analytics Pro',
            location: 'Gondar, Maraki',
            postedDate: '2023-06-05',
            salary: '$100,000 - $140,000',
            category: 'Data Science',
            deadline: '2023-07-05',
            description: 'Seeking a Data Scientist to analyze complex datasets and build predictive models. Python and machine learning experience required.',
            requiredYear: '4+ years',
            quota: 3
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const showJobDetails = (job) => {
        setSelectedJob(job);
        setIsDetailOpen(true);
    };

    const closeJobDetails = () => {
        setIsDetailOpen(false);
        setTimeout(() => setSelectedJob(null), 300); // Wait for animation to complete
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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

            {/* Main Content */}
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
                    <button className="search-button">Search</button>
                </div>
            </div>

            <div className="job-listings">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                            <div className="job-card-header">
                                <h2>{job.title}</h2>
                                <span className="company-name">{job.company}</span>
                            </div>
                            <div className="job-card-body">
                                <div className="job-info">
                                    <div className="info-item">
                                                <span className="info-label">Location</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="info-item">
                                                <span className="info-label">Posted</span>
                                        <span>{formatDate(job.postedDate)}</span>
                                    </div>
                                    <div className="info-item">
                                                <span className="info-label">Salary</span>
                                        <span>{job.salary}</span>
                                    </div>
                                    <div className="info-item">
                                                <span className="info-label">Category</span>
                                        <span className="category-tag">{job.category}</span>
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

            {/* Job Details Modal */}
            {selectedJob && (
                <div className={`job-details-modal ${isDetailOpen ? 'open' : ''}`}>
                    <div className="modal-content">
                        <button className="close-button" onClick={closeJobDetails}>×</button>
                        <h2>{selectedJob.title}</h2>
                        <h3>{selectedJob.company}</h3>

                        <div className="detail-section">
                            <div className="detail-row">
                                        <span className="detail-label">Job ID</span>
                                <span>{selectedJob.id}</span>
                            </div>
                            <div className="detail-row">
                                        <span className="detail-label">Location</span>
                                <span>{selectedJob.location}</span>
                            </div>
                            <div className="detail-row">
                                        <span className="detail-label">Required Experience</span>
                                <span>{selectedJob.requiredYear}</span>
                            </div>
                            <div className="detail-row">
                                        <span className="detail-label">Positions Available</span>
                                <span>{selectedJob.quota}</span>
                            </div>
                            <div className="detail-row">
                                        <span className="detail-label">Salary Range</span>
                                <span>{selectedJob.salary}</span>
                            </div>
                            <div className="detail-row">
                                        <span className="detail-label">Application Deadline</span>
                                <span>{formatDate(selectedJob.deadline)}</span>
                            </div>
                        </div>

                        <div className="description-section">
                            <h4>Job Description</h4>
                            <p>{selectedJob.description}</p>
                        </div>

                        <div className="modal-actions">
                            <Link to='/jobapplication'>
                                <button className="apply-button">Apply Now</button>
                            </Link>
                            <button className="cancel-button" onClick={closeJobDetails}>Close</button>
                        </div>
                    </div>
                </div>
            )}
                </div>
            </main>

            {/* Footer */}
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