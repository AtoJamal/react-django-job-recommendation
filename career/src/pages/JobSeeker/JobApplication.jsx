import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUpload, FiPaperclip, FiCheckCircle } from 'react-icons/fi';
import '../../styles/pages/JobSeeker/JobApplication.css';

const JobApplication = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        introduction: '',
        additionalSkills: '',
        certificate: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock function to simulate resume attachment from Firebase
    const attachResume = () => {
        console.log('Attaching resume from Firebase storage');
        // In a real app, this would fetch the resume from Firebase
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, certificate: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Application submitted:', formData);
            setIsSubmitting(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/');
            }, 3000);
        }, 1500);
    };

    return (
        <motion.div
            className="job-application-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="application-container">
                <h1>Job Application</h1>
                <p className="subtitle">Complete your application for this position</p>

                <form onSubmit={handleSubmit} className="application-form">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="form-group">
                            <label htmlFor="introduction">Self-Introduction Letter*</label>
                            <textarea
                                id="introduction"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder="Write a brief introduction about yourself and why you're a good fit for this position..."
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="form-group">
                            <label htmlFor="additionalSkills">Additional Skills (Optional)</label>
                            <textarea
                                id="additionalSkills"
                                name="additionalSkills"
                                value={formData.additionalSkills}
                                onChange={handleChange}
                                rows={4}
                                placeholder="List any additional skills or qualifications not mentioned in your resume..."
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="form-group">
                            <label>Upload Certificate (Optional)</label>
                            <div className="file-upload">
                                <label htmlFor="certificate" className="upload-label">
                                    <FiUpload className="upload-icon" />
                                    <span>{formData.certificate ? formData.certificate.name : 'Choose file...'}</span>
                                    <input
                                        type="file"
                                        id="certificate"
                                        name="certificate"
                                        onChange={handleFileChange}
                                        accept=".pdf,.jpg,.jpeg,.png"
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
                            <p className="file-hint">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="form-group">
                            <label>Resume Attachment</label>
                            <button
                                type="button"
                                className="attach-resume"
                                onClick={attachResume}
                            >
                                <FiPaperclip className="attach-icon" />
                                Attach My Resume
                            </button>
                            <p className="resume-hint">Your resume will be automatically attached from your profile</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </motion.div>
                </form>

                {/* Success Message */}
                {showSuccess && (
                    <motion.div
                        className="success-message"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <FiCheckCircle className="success-icon" />
                        <p>Application submitted successfully!</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default JobApplication;