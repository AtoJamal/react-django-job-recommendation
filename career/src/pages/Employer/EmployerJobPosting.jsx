import { useState } from 'react';
import '../../styles/pages/Employer/EmployerJobPosting.css';

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
        </div>
    );
};

export default EmployerJobPosting;