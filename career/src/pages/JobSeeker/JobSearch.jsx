import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/JobSeeker/JobSearch.css';

const JobSearch = () => {
    // Mock job data
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'Addis Ababa, (Remote)',
            postedDate: '2023-06-15',
            salary: '$9,000 - $12,000',
            category: 'Software Development',
            deadline: '2023-07-15',
            description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces using React.js and implementing responsive designs.',
            requiredYear: '3+ years',
            quota: 2
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'Creative Solutions',
            location: 'Dessie, ALM',
            postedDate: '2023-06-10',
            salary: '$8,000 - $11,000',
            category: 'Design',
            deadline: '2023-07-10',
            description: 'Join our design team to create beautiful and functional user experiences. You will work closely with product managers and developers to implement design systems.',
            requiredYear: '2+ years',
            quota: 1
        },
        {
            id: 3,
            title: 'Data Scientist',
            company: 'Analytics Pro',
            location: 'Gondar, Maraki',
            postedDate: '2023-06-05',
            salary: '$100,000 - $140,000',
            category: 'Data Science',
            deadline: '2023-07-05',
            description: 'Seeking a Data Scientist to analyze complex datasets and build predictive models. Python and machine learning experience required.',
            requiredYear: '4+ years',
            quota: 3
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const showJobDetails = (job) => {
        setSelectedJob(job);
        setIsDetailOpen(true);
    };

    const closeJobDetails = () => {
        setIsDetailOpen(false);
        setTimeout(() => setSelectedJob(null), 300); // Wait for animation to complete
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="job-search-page">
            <div className="search-container">
                <h1>AI Based Job Recommendation</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by job title, company, or category..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="search-button">Search</button>
                </div>
            </div>

            <div className="job-listings">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                            <div className="job-card-header">
                                <h2>{job.title}</h2>
                                <span className="company-name">{job.company}</span>
                            </div>
                            <div className="job-card-body">
                                <div className="job-info">
                                    <div className="info-item">
                                        <span className="info-label">Location:</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Posted:</span>
                                        <span>{formatDate(job.postedDate)}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Salary:</span>
                                        <span>{job.salary}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Category:</span>
                                        <span className="category-tag">{job.category}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Deadline:</span>
                                        <span>{formatDate(job.deadline)}</span>
                                    </div>
                                </div>
                                <button
                                    className="details-button"
                                    onClick={() => showJobDetails(job)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No jobs found matching your search criteria.</p>
                    </div>
                )}
            </div>

            {/* Job Details Modal */}
            {selectedJob && (
                <div className={`job-details-modal ${isDetailOpen ? 'open' : ''}`}>
                    <div className="modal-content">
                        <button className="close-button" onClick={closeJobDetails}>×</button>
                        <h2>{selectedJob.title}</h2>
                        <h3>{selectedJob.company}</h3>

                        <div className="detail-section">
                            <div className="detail-row">
                                <span className="detail-label">Job ID:</span>
                                <span>{selectedJob.id}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Location:</span>
                                <span>{selectedJob.location}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Required Experience:</span>
                                <span>{selectedJob.requiredYear}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Positions Available:</span>
                                <span>{selectedJob.quota}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Salary Range:</span>
                                <span>{selectedJob.salary}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Application Deadline:</span>
                                <span>{formatDate(selectedJob.deadline)}</span>
                            </div>
                        </div>

                        <div className="description-section">
                            <h4>Job Description</h4>
                            <p>{selectedJob.description}</p>
                        </div>

                        <div className="modal-actions">
                            <Link to='/jobapplication'>
                                <button className="apply-button">Apply Now</button>
                            </Link>
                            <button className="cancel-button" onClick={closeJobDetails}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobSearch;