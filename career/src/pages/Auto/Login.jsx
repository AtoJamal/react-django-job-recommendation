import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../styles/pages/JobSeeker/Login.css';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Login = () => {
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

    // Login logic (existing)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [userType, setUserType] = useState('jobseeker');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            let response;
            if (userType === 'jobseeker') {
                response = await api.loginJobSeeker(formData);
                window.location.href = 'http://localhost:5173/jobsearch';
            } else {
                response = await api.loginEmployer(formData);
                window.location.href = 'http://localhost:5173/employeraccount';
            }
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (err) {
            setError(err?.non_field_errors?.[0] || err?.detail || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={`careerplus-login-root ${theme}`}>
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
                        <a href="/" className="careerplus__nav-link">Home</a>
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

            {/* Main Login Section */}
            <main className="careerplus-login-main">
                <motion.section
                    className="careerplus-login-card glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="careerplus-login-title">Sign In</h1>
                    <p className="careerplus-login-subtitle">Access your account to find your next opportunity</p>
                    <form onSubmit={handleSubmit} className="careerplus-login-form">
                        <div className="form-group user-type-group">
                            <label className="careerplus-login-label">User Type</label>
                            <div className="user-type-options">
                                <label className={`user-type-option ${userType === 'jobseeker' ? 'selected' : ''}`} htmlFor="jobseeker">
                                    <input
                                        type="radio"
                                        id="jobseeker"
                                        name="userType"
                                        value="jobseeker"
                                        checked={userType === 'jobseeker'}
                                        onChange={handleUserTypeChange}
                                    />
                                    Job Seeker
                                </label>
                                <label className={`user-type-option ${userType === 'employer' ? 'selected' : ''}`} htmlFor="employer">
                                    <input
                                        type="radio"
                                        id="employer"
                                        name="userType"
                                        value="employer"
                                        checked={userType === 'employer'}
                                        onChange={handleUserTypeChange}
                                    />
                                    Employer
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="careerplus-login-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="careerplus-login-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="careerplus-login-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="careerplus-login-input"
                            />
                        </div>
                        {error && <div className="careerplus-login-error">{error}</div>}
                        <button type="submit" className="careerplus-login-btn">Login</button>
                    </form>
                    <div className="careerplus-login-footer">
                        <p>Don't have an account? <Link to="/register" className="careerplus-login-link">Register</Link></p>
                    </div>
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
                    <p>&copy; {new Date().getFullYear()} CareerPlus. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Login;