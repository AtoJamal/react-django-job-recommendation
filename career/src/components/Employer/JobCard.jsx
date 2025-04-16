import { useState } from 'react';

const JobCard = ({ job, applicants }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="job-card">
            <div className="job-header">
                <h3>{job.title}</h3>
                <span className={`status-badge ${job.status.toLowerCase().replace(' ', '-')}`}>
                    {job.status}
                </span>
            </div>
            <div className="job-meta">
                <p>Posted: {new Date(job.postTime).toLocaleDateString()}</p>
                <p>Applicants: {applicants.length}</p>
            </div>
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="details-btn"
            >
                {showDetails ? 'Hide Details' : 'View Details'}
            </button>

            {showDetails && (
                <div className="job-details">
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Category:</strong> {job.category}</p>
                    <p><strong>Experience Required:</strong> {job.experience}</p>
                    <p><strong>Open Positions:</strong> {job.quota}</p>
                    <p><strong>Application Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
                    <p><strong>Description:</strong></p>
                    <p>{job.description}</p>
                </div>
            )}
        </div>
    );
};

export default JobCard;