import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/JobSeeker/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Login logic would go here
        console.log('Login form submitted', formData);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Please enter your credentials to login</p>

                <form onSubmit={handleSubmit} className="auth-form">
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
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="auth-button">Login</button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register" className="auth-link">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;