import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/pages/JobSeeker/Register.css';
import api from '../../api';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Register = () => {
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

    const [userType, setUserType] = useState('jobSeeker');
    const [hasCompany, setHasCompany] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        gender: '',
        location: '',
        countryCode: '+1',
        phone: '',
        email: '',
        password: '',
        // Job Seeker specific
        degree: '',
        experience: '',
        graduationYear: '',
        fieldOfStudy: '',
        // Employer with company
        companyName: '',
        companyLocation: '',
        employeesCount: '',
        establishmentYear: ''
    });

    const GENDER_CHOICES = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
    ];

    const DEGREE_CHOICES = [
        { value: 'Bachelor', label: 'Bachelor' },
        { value: 'Master', label: 'Master' },
        { value: 'PhD', label: 'PhD' },
        { value: 'Diploma', label: 'Diploma' }
    ];

    const FIELD_OF_STUDY_CHOICES = [
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Business', label: 'Business' },
        { value: 'Arts', label: 'Arts' },
        { value: 'Medicine', label: 'Medicine' }
    ];

    const COUNTRY_CODES = [
        { code: '+1', country: 'United States' },
        { code: '+44', country: 'United Kingdom' },
        { code: '+91', country: 'India' },
        { code: '+86', country: 'China' },
        { code: '+81', country: 'Japan' },
        { code: '+49', country: 'Germany' },
        { code: '+33', country: 'France' },
        { code: '+61', country: 'Australia' },
        { code: '+55', country: 'Brazil' },
        { code: '+27', country: 'South Africa' },
        { code: '+234', country: 'Nigeria' },
        { code: '+254', country: 'Kenya' },
        { code: '+251', country: 'Ethiopia' },
        { code: '+20', country: 'Egypt' },
        { code: '+212', country: 'Morocco' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (/^\d*$/.test(value)) {
            setFormData(prev => ({ ...prev, phone: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Prepare the data based on user type
            const submitData = {
                first_name: formData.firstName,
                middle_name: formData.middleName || null, // Send null if empty string
                last_name: formData.lastName,
                age: parseInt(formData.age) || null,
                gender: formData.gender,
                location: formData.location,
                phone_number: formData.countryCode + formData.phone,
                email: formData.email,
                password: formData.password,
                is_email_verified: false
            };

            if (userType === 'jobSeeker') {
                // Add job seeker specific fields
                submitData.degree = formData.degree;
                submitData.experience = parseInt(formData.experience) || 0;
                submitData.graduation_year = parseInt(formData.graduationYear);
                submitData.field_of_study = formData.fieldOfStudy;

                const response = await api.createJobSeeker(submitData);
                if (response.data) {
                    navigate('/login', { state: { success: 'Registration successful! Please login.' } });
                }
            } else {
                // Add employer specific fields
                if (hasCompany) {
                    submitData.company = {
                        name: formData.companyName,
                        location: formData.companyLocation,
                        number_of_employees: parseInt(formData.employeesCount) || null,
                        year_established: parseInt(formData.establishmentYear) || null
                    };
                }

                const response = await api.createEmployer(submitData);
                if (response.data) {
                    navigate('/login', { state: { success: 'Registration successful! Please login.' } });
                }
            }
        } 
        catch (err) {
            console.error('Full error object:', err);
            
            // Network errors (no response from server)
            if (err.message === "Network Error") {
                setError('Cannot connect to server.');
                return;
            }
        
            // Backend returned error response (4xx/5xx)
            if (err.response) {
                const errorData = err.response.data;
                
                // Django validation errors (400 Bad Request)
                if (err.response.status === 400) {
                    if (typeof errorData === 'object') {
                        // Handle field errors like {"email": ["This field is required"]}
                        const firstError = Object.entries(errorData)[0];
                        setError(`${firstError[0]}: ${firstError[1][0]}`);
                    } else {
                        setError(errorData.detail || 'Invalid data submitted');
                    }
                }
                // Other HTTP errors
                else {
                    setError(errorData.detail || `Server error (${err.response.status})`);
                }
                return;
            }
        
            // All other cases
            setError('Unknown error occurred. Check console for details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`careerplus-register-root ${theme}`}>
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

            {/* Main Register Section */}
            <main className="careerplus-register-main">
                <motion.section
                    className="careerplus-register-card glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="careerplus-register-title">Create Account</h1>
                    <p className="careerplus-register-subtitle">Join us as a...</p>

                    {error && <div className="careerplus-register-error">{error}</div>}

                    <div className="user-type-group">
                        <div className="user-type-options">
                            <label className={`user-type-option ${userType === 'jobSeeker' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="jobSeeker"
                                    checked={userType === 'jobSeeker'}
                                    onChange={() => setUserType('jobSeeker')}
                                />
                                Job Seeker
                            </label>
                            <label className={`user-type-option ${userType === 'employer' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="employer"
                                    checked={userType === 'employer'}
                                    onChange={() => setUserType('employer')}
                                />
                                Employer
                            </label>
                        </div>
                </div>

                    <form onSubmit={handleSubmit} className="careerplus-register-form">
                    <div className="form-row">
                        <div className="form-group">
                                <label htmlFor="firstName" className="careerplus-register-label">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                    className="careerplus-register-input"
                                placeholder="First name"
                            />
                        </div>

                            <div className="form-group">
                                <label htmlFor="middleName" className="careerplus-register-label">Middle Name</label>
                                <input
                                    type="text"
                                    id="middleName"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    className="careerplus-register-input"
                                    placeholder="Middle name (optional)"
                                />
                            </div>
                    </div>

                        <div className="form-group">
                            <label htmlFor="lastName" className="careerplus-register-label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="careerplus-register-input"
                                placeholder="Last name"
                            />
                        </div>

                    <div className="form-row">
                        <div className="form-group">
                                <label htmlFor="age" className="careerplus-register-label">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                min="18"
                                    className="careerplus-register-input"
                                placeholder="Your age"
                            />
                        </div>

                        <div className="form-group">
                                <label htmlFor="gender" className="careerplus-register-label">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                    className="careerplus-register-input"
                            >
                                <option value="">Select gender</option>
                                {GENDER_CHOICES.map(choice => (
                                    <option key={choice.value} value={choice.value}>
                                        {choice.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                            <label htmlFor="location" className="careerplus-register-label">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                                className="careerplus-register-input"
                            placeholder="City, Country"
                        />
                    </div>

                    <div className="form-group">
                            <label htmlFor="phone" className="careerplus-register-label">Phone Number</label>
                            <div className="phone-input-group">
                                <select
                                    id="countryCode"
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="careerplus-register-input country-code-select"
                                >
                                    {COUNTRY_CODES.map(({ code, country }) => (
                                        <option key={code} value={code}>
                                            {code} ({country})
                                        </option>
                                    ))}
                                </select>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                                    onChange={handlePhoneChange}
                            required
                                    className="careerplus-register-input phone-input"
                                    placeholder="Phone number"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                        />
                            </div>
                    </div>

                    {userType === 'jobSeeker' && (
                        <>
                            <div className="form-group">
                                    <label htmlFor="degree" className="careerplus-register-label">Highest Degree</label>
                                <select
                                    id="degree"
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                    required
                                        className="careerplus-register-input"
                                >
                                    <option value="">Select degree</option>
                                    {DEGREE_CHOICES.map(choice => (
                                        <option key={choice.value} value={choice.value}>
                                            {choice.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                        <label htmlFor="experience" className="careerplus-register-label">Experience (years)</label>
                                    <input
                                        type="number"
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        min="0"
                                            className="careerplus-register-input"
                                        placeholder="Years of experience"
                                    />
                                </div>

                                <div className="form-group">
                                        <label htmlFor="graduationYear" className="careerplus-register-label">Graduation Year</label>
                                    <input
                                        type="number"
                                        id="graduationYear"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                            className="careerplus-register-input"
                                        placeholder="Year of graduation"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                    <label htmlFor="fieldOfStudy" className="careerplus-register-label">Field of Study</label>
                                <select
                                    id="fieldOfStudy"
                                    name="fieldOfStudy"
                                    value={formData.fieldOfStudy}
                                    onChange={handleChange}
                                    required
                                        className="careerplus-register-input"
                                >
                                    <option value="">Select field of study</option>
                                    {FIELD_OF_STUDY_CHOICES.map(choice => (
                                        <option key={choice.value} value={choice.value}>
                                            {choice.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {userType === 'employer' && (
                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasCompany}
                                    onChange={() => setHasCompany(!hasCompany)}
                                />
                                <span>Do you own a company?</span>
                            </label>
                        </div>
                    )}

                    {userType === 'employer' && hasCompany && (
                        <>
                            <div className="form-group">
                                    <label htmlFor="companyName" className="careerplus-register-label">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                        className="careerplus-register-input"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div className="form-group">
                                    <label htmlFor="companyLocation" className="careerplus-register-label">Company Location</label>
                                <input
                                    type="text"
                                    id="companyLocation"
                                    name="companyLocation"
                                    value={formData.companyLocation}
                                    onChange={handleChange}
                                    required
                                        className="careerplus-register-input"
                                    placeholder="Company headquarters"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                        <label htmlFor="employeesCount" className="careerplus-register-label">Number of Employees</label>
                                    <input
                                        type="number"
                                        id="employeesCount"
                                        name="employeesCount"
                                        value={formData.employeesCount}
                                        onChange={handleChange}
                                        min="1"
                                            className="careerplus-register-input"
                                        placeholder="Approximate count"
                                    />
                                </div>

                                <div className="form-group">
                                        <label htmlFor="establishmentYear" className="careerplus-register-label">Year Established</label>
                                    <input
                                        type="number"
                                        id="establishmentYear"
                                        name="establishmentYear"
                                        value={formData.establishmentYear}
                                        onChange={handleChange}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                            className="careerplus-register-input"
                                        placeholder="Year founded"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-group">
                            <label htmlFor="email" className="careerplus-register-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                                className="careerplus-register-input"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                            <label htmlFor="password" className="careerplus-register-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                                className="careerplus-register-input"
                            placeholder="Create a password"
                        />
                        <p className="password-hint">Minimum 8 characters</p>
                    </div>

                    <button 
                        type="submit" 
                            className="careerplus-register-btn"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                    <div className="careerplus-register-footer">
                        <p>Already have an account? <Link to="/login" className="careerplus-register-link">Login</Link></p>
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

export default Register;