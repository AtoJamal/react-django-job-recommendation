import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/Jobseeker/Register.css';

const Register = () => {
    const [userType, setUserType] = useState('jobSeeker');
    const [hasCompany, setHasCompany] = useState(false);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Registration logic would go here
        console.log('Registration form submitted', { userType, hasCompany, ...formData });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join us as a...</p>

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
                    {/* Common Fields */}
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

                        {userType === 'jobSeeker' && (
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
                        )}
                    </div>

                    {userType === 'jobSeeker' && (
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
                    )}

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
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
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
                                <input
                                    type="text"
                                    id="degree"
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Bachelor of Science"
                                />
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
                                <input
                                    type="text"
                                    id="fieldOfStudy"
                                    name="fieldOfStudy"
                                    value={formData.fieldOfStudy}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Computer Science"
                                />
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

                    <button type="submit" className="auth-button">Create Account</button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;