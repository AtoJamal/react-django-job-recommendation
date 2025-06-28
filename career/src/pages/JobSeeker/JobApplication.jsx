import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUpload, FiPaperclip, FiCheckCircle, FiSun, FiMoon, FiLogOut, FiSearch } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import api from '../../api';
import '../../styles/pages/JobSeeker/JobApplication.css';

const JobApplication = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        introduction: '',
        additional_skills: '',
        certificate: null,
        resume: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Authentication check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/verify/');
                setUser(response.data.user);
                if (response.data.user && response.data.user.type === 'jobseeker') {
                    const resumeResponse = await api.get(`/jobseekers/${response.data.user.id}/resume/`);
                    setFormData(prev => ({ ...prev, resume: resumeResponse.data }));
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.error('Authentication check failed:', err);
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, certificate: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || user.type !== 'jobseeker') {
            setError('Please login as a job seeker to apply');
            return;
        }
        setIsSubmitting(true);
        setError(null);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('job', jobId);
            formDataToSend.append('job_seeker', user.id);
            formDataToSend.append('introduction', formData.introduction);
            formDataToSend.append('additional_skills', formData.additional_skills);
            if (formData.certificate) {
                formDataToSend.append('certificate', formData.certificate);
            }
            if (formData.resume) {
                formDataToSend.append('resume', formData.resume);
            }
            const response = await api.post('/applications/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowSuccess(true);
            setTimeout(() => navigate('/jobs'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Application failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return <div className="careerplus-jobapplication-loading">Checking authentication...</div>;
    }

    return (
        <div className={`careerplus-jobapplication-root ${theme}`}>
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
                        <Link to="/jobsearch" className="careerplus__nav-icon" aria-label="Job Search">
                            <FiSearch />
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

            {/* Main Job Application Section */}
            <main className="careerplus-jobapplication-main">
                <motion.section
                    className="careerplus-jobapplication-card glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="careerplus-jobapplication-title">Apply for Job</h1>
                    <p className="careerplus-jobapplication-subtitle">Submit your application to land your dream job</p>
                    {showSuccess && (
                        <div className="careerplus-jobapplication-success">
                            <FiCheckCircle className="success-icon" />
                            <p>Application submitted successfully! Redirecting...</p>
                        </div>
                    )}
                    {error && (
                        <div className="careerplus-jobapplication-error">{error}</div>
                    )}
                    <form onSubmit={handleSubmit} className="careerplus-jobapplication-form" style={{ opacity: isSubmitting ? 0.5 : 1 }}>
                        <div className="form-group">
                            <label htmlFor="introduction" className="careerplus-jobapplication-label">Introduction *</label>
                            <textarea
                                id="introduction"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleChange}
                                required
                                className="careerplus-jobapplication-input"
                                placeholder="Tell us about yourself and why you're a great fit"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="additional_skills" className="careerplus-jobapplication-label">Additional Skills</label>
                            <textarea
                                id="additional_skills"
                                name="additional_skills"
                                value={formData.additional_skills}
                                onChange={handleChange}
                                className="careerplus-jobapplication-input"
                                placeholder="List any additional skills relevant to the job"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="careerplus-jobapplication-label">Certificate (Optional)</label>
                            <div className="file-upload">
                                <label className="upload-label">
                                    <FiUpload className="upload-icon" />
                                    <span>{formData.certificate ? formData.certificate.name : 'Upload Certificate'}</span>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                {formData.certificate && (
                                    <button
                                        type="button"
                                        className="remove-file"
                                        onClick={() => setFormData(prev => ({ ...prev, certificate: null }))}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <p className="file-hint">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                        <div className="form-group">
                            <label className="careerplus-jobapplication-label">Resume</label>
                            {formData.resume ? (
                                <div className="resume-attachment">
                                    <FiPaperclip className="attach-icon" />
                                    <span>Resume attached from profile</span>
                                </div>
                            ) : (
                                <p className="resume-missing">No resume found in your profile. Please upload one in your profile settings.</p>
                            )}
                        </div>
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="careerplus-jobapplication-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
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
                        <div className="careerplus__social-icons ESI">
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

export default JobApplication;