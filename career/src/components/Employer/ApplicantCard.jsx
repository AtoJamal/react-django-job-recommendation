import { useState } from 'react';

const ApplicantCard = ({ applicant, onAccept, onReject }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="applicant-card">
            <div className="applicant-header">
                <h3>{applicant.name}</h3>
                <div className="applicant-actions">
                    <button
                        onClick={onAccept}
                        className="accept-btn"
                    >
                        Accept
                    </button>
                    <button
                        onClick={onReject}
                        className="reject-btn"
                    >
                        Reject
                    </button>
                </div>
            </div>
            <div className="applicant-meta">
                <p><strong>Field of Study:</strong> {applicant.fieldOfStudy}</p>
                <p><strong>Degree:</strong> {applicant.degree}</p>
            </div>
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="details-btn"
            >
                {showDetails ? 'Hide Details' : 'View Details'}
            </button>

            {showDetails && (
                <div className="applicant-details">
                    <p><strong>Age:</strong> {applicant.age}</p>
                    <p><strong>Gender:</strong> {applicant.gender}</p>
                    <p><strong>Location:</strong> {applicant.location}</p>
                    <p><strong>Phone:</strong> {applicant.phoneNumber}</p>
                    <p><strong>Experience:</strong> {applicant.experience}</p>
                    <p><strong>Graduation Year:</strong> {applicant.graduationYear}</p>
                </div>
            )}
        </div>
    );
};

export default ApplicantCard;