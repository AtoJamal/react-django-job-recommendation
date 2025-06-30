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
        certificate: null
    });
    const [jobDetails, setJobDetails] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    // Fetch job details and verify authentication
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Verify authentication
                const authResponse = await api.verifyAuth();
                if (!authResponse.data?.user?.type === 'jobseeker') {
                    navigate('/login');
                    return;
                }
                setUser(authResponse.data.user);

                // Fetch job details
                const jobResponse = await api.getJobDetails(jobId);
                setJobDetails(jobResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                navigate('/login');
            }
        };

        fetchData();
    }, [jobId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, certificate: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('Please login to apply');
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

            await api.submitApplication(formDataToSend);
            setShowSuccess(true);
            setTimeout(() => navigate('/jobs'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Application failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user || !jobDetails) {
        return <div className="careerplus-jobapplication-loading">Loading...</div>;
    }

    return (
        <div className={`careerplus-jobapplication-root ${theme}`}>
            {/* Header - keep your existing header code */}

            <main className="careerplus-jobapplication-main">
                <motion.section
                    className="careerplus-jobapplication-card glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="careerplus-jobapplication-title">Apply for {jobDetails.job_title}</h1>
                    <p className="careerplus-jobapplication-subtitle">
                        {jobDetails.employer?.company?.name || 'Unknown Company'}
                    </p>

                    {showSuccess && (
                        <div className="careerplus-jobapplication-success">
                            <FiCheckCircle className="success-icon" />
                            <p>Application submitted successfully! Redirecting...</p>
                        </div>
                    )}

                    {error && <div className="careerplus-jobapplication-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="careerplus-jobapplication-form">
                        <div className="form-group">
                            <label htmlFor="introduction" className="careerplus-jobapplication-label">
                                Introduction *
                            </label>
                            <textarea
                                id="introduction"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleChange}
                                required
                                className="careerplus-jobapplication-input"
                                placeholder="Tell us about yourself and why you're a great fit"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="additional_skills" className="careerplus-jobapplication-label">
                                Additional Skills
                            </label>
                            <textarea
                                id="additional_skills"
                                name="additional_skills"
                                value={formData.additional_skills}
                                onChange={handleChange}
                                className="careerplus-jobapplication-input"
                                placeholder="List any additional skills relevant to the job"
                            />
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