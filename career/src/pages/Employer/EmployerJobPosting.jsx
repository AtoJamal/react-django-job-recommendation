
import '../../styles/pages/Employer/EmployerJobPosting.css';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiSave, FiUser, FiMail, FiPhone, FiLock, FiBriefcase, FiPlus, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const EmployerJobPosting = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        requiredAge: '',
        salary: '',
        category: 'IT',
        experience: '',
        quota: '',
        deadline: '',
        description: ''
    });

    const categories = ['IT', 'Marketing', 'Finance', 'HR', 'Design', 'Engineering'];

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Job Posted:', formData);
        alert('Job posted successfully!');
    };

    return (
        <div className="job-posting-container">
            <h1>Post a New Job</h1>
            <form onSubmit={handleSubmit} className="job-posting-form">
                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="requiredAge">Required Age</label>
                        <input
                            type="number"
                            id="requiredAge"
                            name="requiredAge"
                            min="18"
                            value={formData.requiredAge}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary">Salary ($)</label>
                        <input
                            type="text"
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="e.g. 50000 or Negotiable"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="graduationYear">Required Experience Year</label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            min="0"
                            max="15"
                            value={formData.experience}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="quota">Quota (Open Positions)</label>
                        <input
                            type="number"
                            id="quota"
                            name="quota"
                            min="1"
                            value={formData.quota}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deadline">Application Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Job Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-btn">Post Job</button>
            </form>

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
            
        </div>
    );
};

export default EmployerJobPosting;