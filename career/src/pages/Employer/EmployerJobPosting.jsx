import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../styles/pages/Employer/EmployerJobPosting.css';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub, FaUser } from 'react-icons/fa';

const EmployerJobPosting = () => {
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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Job posting logic
    const [formData, setFormData] = useState({
        jobTitle: '',
        location: '',
        requiredAge: '',
        salary: '',
        category: 'IT',
        experience: '',
        quota: '',
        deadline: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const categories = ['IT', 'Marketing', 'Finance', 'HR', 'Design', 'Engineering', 'Healthcare', 'Education', 'Other'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const jobData = {
            job_title: formData.jobTitle,
            location: formData.location,
            required_year: formData.experience || null,
            salary: formData.salary === 'Negotiable' || formData.salary === '' ? null : parseFloat(formData.salary),
            category: formData.category,
            quota: parseInt(formData.quota),
            deadline: formData.deadline,
            description: formData.description,
        };

        if (!jobData.job_title || !jobData.location || !jobData.quota || !jobData.deadline || !jobData.description) {
            setError('Please fill in all required fields: Job Title, Location, Quota, Deadline, and Description.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await api.postJob(jobData);
            console.log('Job posted successfully:', response.data);
            setSuccess(true);
            setFormData({
                jobTitle: '',
                location: '',
                requiredAge: '',
                salary: '',
                category: 'IT',
                experience: '',
                quota: '',
                deadline: '',
                description: ''
            });
        } catch (error) {
            console.error('Error posting job:', error);
            setError(error.response?.data?.detail ||
                error.response?.data ||
                error.message ||
                'Failed to post job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`careerplus-jobposting-root ${theme}`}>
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
                        <Link to="/employeraccount" className="careerplus__nav-icon" aria-label="Employer Account">
                            <FaUser />
                        </Link>
                        <button
                            className="careerplus__nav-icon"
                            onClick={handleLogout}
                            aria-label="Logout"
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

            {/* Main Job Posting Section */}
            <main className="careerplus-jobposting-main">
                <motion.section
                    className="careerplus-jobposting-card glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="careerplus-jobposting-title">Post a New Job</h1>
                    {error && (
                        <div className="careerplus-jobposting-error">
                            {typeof error === 'object' ? JSON.stringify(error) : error}
                        </div>
                    )}
                    {success && (
                        <div className="careerplus-jobposting-success">
                            Job posted successfully! It will be visible after admin approval.
                        </div>
                    )}
                    {isSubmitting && (
                        <div className="careerplus-jobposting-loading">
                            Posting job... Please wait.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="careerplus-jobposting-form" style={{ opacity: isSubmitting ? 0.5 : 1 }}>
                        <div className="form-group">
                            <label htmlFor="jobTitle" className="careerplus-jobposting-label">Job Title *</label>
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                                className="careerplus-jobposting-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location" className="careerplus-jobposting-label">Location *</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="careerplus-jobposting-input"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="requiredAge" className="careerplus-jobposting-label">Minimum Age</label>
                                <input
                                    type="number"
                                    id="requiredAge"
                                    name="requiredAge"
                                    min="18"
                                    value={formData.requiredAge}
                                    onChange={handleChange}
                                    className="careerplus-jobposting-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary" className="careerplus-jobposting-label">Salary</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="e.g. 50000 or Negotiable"
                                    className="careerplus-jobposting-input"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category" className="careerplus-jobposting-label">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="careerplus-jobposting-input"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="experience" className="careerplus-jobposting-label">Years of Experience</label>
                                <input
                                    type="number"
                                    id="experience"
                                    name="experience"
                                    min="0"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="careerplus-jobposting-input"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="quota" className="careerplus-jobposting-label">Open Positions *</label>
                                <input
                                    type="number"
                                    id="quota"
                                    name="quota"
                                    min="1"
                                    value={formData.quota}
                                    onChange={handleChange}
                                    required
                                    className="careerplus-jobposting-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="deadline" className="careerplus-jobposting-label">Application Deadline *</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                    className="careerplus-jobposting-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="careerplus-jobposting-label">Job Description *</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="careerplus-jobposting-input"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="careerplus-jobposting-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Posting...' : 'Post Job'}
                        </button>
                    </form>
                </motion.section>
            </main>

            {/* Footer */}
            <footer id="contact" className="careerplus__footer">
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
                        <a href="/login" className="careerplus__footer-link">Login</a>
                        <a href="/register" className="careerplus__footer-link">Register</a>
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
                    <p>© {new Date().getFullYear()} CareerPlus. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default EmployerJobPosting;