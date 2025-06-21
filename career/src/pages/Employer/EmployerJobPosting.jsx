import { useState } from 'react';
import api from '../../api';
import '../../styles/pages/Employer/EmployerJobPosting.css';

const EmployerJobPosting = () => {
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

        // Prepare data for API
        const jobData = {
            job_title: formData.jobTitle,
            location: formData.location,
            required_year: formData.experience || null,
            salary: formData.salary === 'Negotiable' || formData.salary === '' ? null : parseFloat(formData.salary),
            category: formData.category,
            quota: parseInt(formData.quota),
            deadline: formData.deadline,
            description: formData.description,
            // These will be set automatically by the backend:
            // employer: (set from auth token)
            // status: 'Pending' (or whatever default the backend uses)
        };

        // Validate required fields
        if (!jobData.job_title || !jobData.location || !jobData.quota || !jobData.deadline || !jobData.description) {
            setError('Please fill in all required fields: Job Title, Location, Quota, Deadline, and Description.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await api.postJob(jobData);
            console.log('Job posted successfully:', response.data);
            
            setSuccess(true);
            // Reset form
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
        <div className="job-posting-container">
            <h1>Post a New Job</h1>
            
            {error && (
                <div className="error-message">
                    {typeof error === 'object' ? JSON.stringify(error) : error}
                </div>
            )}
            
            {success && (
                <div className="success-message">
                    Job posted successfully! It will be visible after admin approval.
                </div>
            )}

            <form onSubmit={handleSubmit} className="job-posting-form">
                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title *</label>
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location *</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="requiredAge">Minimum Age</label>
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
                        <label htmlFor="salary">Salary</label>
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
                        <label htmlFor="experience">Years of Experience</label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            min="0"
                            value={formData.experience}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="quota">Open Positions *</label>
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
                        <label htmlFor="deadline">Application Deadline *</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Job Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
            </form>
        </div>
    );
};

export default EmployerJobPosting;