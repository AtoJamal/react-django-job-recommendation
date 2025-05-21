import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/pages/JobSeeker/Register.css';
import api from '../../api';

const Register = () => {
    const navigate = useNavigate();
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                phone_number: formData.phone,
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
                setError('Cannot connect to server. Check:');
                setError(prev => prev + '\n1. Is Django running?');
                setError(prev => prev + '\n2. Check browser console for CORS errors');
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
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join us as a...</p>

                {error && <div className="error-message">{error}</div>}

                <div className="user-type-toggle">
                    <button
                        type="button"
                        className={`toggle-option ${userType === 'jobSeeker' ? 'active' : ''}`}
                        onClick={() => setUserType('jobSeeker')}
                    >
                        Job Seeker
                    </button>
                    <button
                        type="button"
                        className={`toggle-option ${userType === 'employer' ? 'active' : ''}`}
                        onClick={() => setUserType('employer')}
                    >
                        Employer
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Common Fields - Now including middleName and lastName for all user types */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="First name"
                            />
                        </div>

                        {/* Middle Name field - Now always rendered */}
                            <div className="form-group">
                                <label htmlFor="middleName">Middle Name</label>
                                <input
                                    type="text"
                                    id="middleName"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    placeholder="Middle name (optional)"
                                />
                            </div>
                    </div>

                    {/* Last Name field - Now always rendered */}
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Last name"
                            />
                        </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                min="18"
                                placeholder="Your age"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
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
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="City, Country"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    {/* Job Seeker Specific Fields */}
                    {userType === 'jobSeeker' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="degree">Highest Degree</label>
                                <select
                                    id="degree"
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                    required
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
                                    <label htmlFor="experience">Experience (years)</label>
                                    <input
                                        type="number"
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="Years of experience"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="graduationYear">Graduation Year</label>
                                    <input
                                        type="number"
                                        id="graduationYear"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        placeholder="Year of graduation"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="fieldOfStudy">Field of Study</label>
                                <select
                                    id="fieldOfStudy"
                                    name="fieldOfStudy"
                                    value={formData.fieldOfStudy}
                                    onChange={handleChange}
                                    required
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

                    {/* Employer Specific Fields */}
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

                    {/* Company Details (if employer with company) */}
                    {userType === 'employer' && hasCompany && (
                        <>
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your company name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="companyLocation">Company Location</label>
                                <input
                                    type="text"
                                    id="companyLocation"
                                    name="companyLocation"
                                    value={formData.companyLocation}
                                    onChange={handleChange}
                                    required
                                    placeholder="Company headquarters"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="employeesCount">Number of Employees</label>
                                    <input
                                        type="number"
                                        id="employeesCount"
                                        name="employeesCount"
                                        value={formData.employeesCount}
                                        onChange={handleChange}
                                        min="1"
                                        placeholder="Approximate count"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="establishmentYear">Year Established</label>
                                    <input
                                        type="number"
                                        id="establishmentYear"
                                        name="establishmentYear"
                                        value={formData.establishmentYear}
                                        onChange={handleChange}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        placeholder="Year founded"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Common Auth Fields */}
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                            placeholder="Create a password"
                        />
                        <p className="password-hint">Minimum 8 characters</p>
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;