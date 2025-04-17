import { useState, useEffect } from 'react';
import '../../styles/pages/Employer/EmployerAccount.css';
import JobCard from '../../components/Employer/JobCard';
import ApplicantCard from '../../components/Employer/ApplicantCard';
import CompanyDetailModal from '../../components/Employer/CompanyDetailModal';
import profileImage from '../../assets/man1.jpg';

const EmployerAccount = () => {
    // Profile state
    const [profile, setProfile] = useState({
        firstName: 'Abebe',
        middleName: 'Abebe',
        lastName: 'Abebe',
        age: 42,
        gender: 'Male',
        location: 'Gondar',
        email: 'Abebe.abebe@example.com',
        phoneNumber: '+(251) 9123-456',
        profilePicture: profileImage
    });

    // Company state
    const [company, setCompany] = useState({
        name: 'Tech Innovations Inc.',
        location: 'Gondar',
        yearEstablished: '2015'
    });

    // Jobs state
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: 'Senior React Developer',
            postTime: '2023-05-15',
            status: 'Approved',
            salary: '$10,000 - $15,000',
            category: 'Software Development',
            experience: '5+ years',
            quota: 2,
            deadline: '2023-06-30',
            description: 'We are looking for an experienced React developer to join our team.'
        },
        {
            id: 2,
            title: 'UX Designer',
            postTime: '2023-05-20',
            status: 'Under Review',
            salary: '$9,000 - $11,000',
            category: 'Design',
            experience: '3+ years',
            quota: 1,
            deadline: '2023-07-15',
            description: 'Join our design team to create beautiful user experiences.'
        }
    ]);

    // Applicants state
    const [applicants, setApplicants] = useState([
        {
            id: 1,
            jobId: 1,
            name: 'Abebe Abebe',
            fieldOfStudy: 'Computer Science',
            degree: 'Master',
            age: 28,
            gender: 'Female',
            location: 'Gondar',
            phoneNumber: '+(251) 9123-456',
            experience: '4 years',
            graduationYear: 2020,
            status: 'pending' // Added status field
        },
        {
            id: 2,
            jobId: 1,
            name: 'Abebe abebe',
            fieldOfStudy: 'Software Engineering',
            degree: 'Bachelor',
            age: 25,
            gender: 'Male',
            location: 'Gondar',
            phoneNumber: '+(251) 9123-456',
            experience: '2 years',
            graduationYear: 2021,
            status: 'pending' // Added status field
        }
    ]);

    // Modal states
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [editingProfile, setEditingProfile] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Handle profile changes - only phone number is editable
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    // Handle password changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    // Handle profile picture upload
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile(prev => ({ ...prev, profilePicture: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle password update
    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        // Add password validation and update logic here
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        // In a real app, you would send this to your backend
        console.log("Password updated successfully");
        setPasswordData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setEditingPassword(false);
    };

    // Handle profile update - only phone number and profile picture
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        console.log("Profile updated successfully");
        setEditingProfile(false);
    };

    // Handle applicant action
    const handleApplicantAction = (applicantId, action) => {
        setApplicants(prevApplicants =>
            prevApplicants.map(applicant =>
                applicant.id === applicantId
                    ? { ...applicant, status: action }
                    : applicant
            )
        );
        console.log(`${action}ed applicant ${applicantId}`);

    };

    // Toggle company modal
    const toggleCompanyModal = () => {
        setShowCompanyModal(prev => !prev);
    };

    return (
        <div className="employer-account-container">


            {/* Profile Summary Section */}
            <section className="profile-section">
                <h2>Profile Summary</h2>
                <div className="profile-content">
                    <div className="profile-picture-container">
                        <img
                            src={profile.profilePicture}
                            alt="Profile"
                            className="profile-picture"
                        />
                        {editingProfile && (
                            <div className="profile-picture-upload-container">
                                <label htmlFor="profile-picture-upload" className="upload-label">
                                    Change Photo
                                </label>
                                <input
                                    id="profile-picture-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="profile-picture-upload"
                                />
                            </div>
                        )}
                    </div>

                    {!editingProfile ? (
                        <div className="profile-details">
                            <p><strong>Name:</strong> {profile.firstName} {profile.middleName} {profile.lastName}</p>
                            <p><strong>Age:</strong> {profile.age}</p>
                            <p><strong>Gender:</strong> {profile.gender}</p>
                            <p><strong>Location:</strong> {profile.location}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Phone:</strong> {profile.phoneNumber}</p>
                            <button
                                onClick={() => setEditingProfile(true)}
                                className="edit-profile-btn"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleProfileUpdate} className="profile-edit-form">
                            {/* Only phone number is editable */}
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={profile.phoneNumber}
                                    onChange={handleProfileChange}
                                    required
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="save-btn">Save Changes</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingProfile(false)}
                                    className="cancel-btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>


                <button
                    onClick={toggleCompanyModal}
                    className="company-details-btn"
                >
                    View Company Details
                </button>

                {/* Password Update Section */}
                <div className="password-section">
                    {!editingPassword ? (
                        <button
                            onClick={() => setEditingPassword(true)}
                            className="change-password-btn"
                        >
                            Change Password
                        </button>
                    ) : (
                        <form onSubmit={handlePasswordUpdate} className="password-form">
                            <div className="form-group">
                                <label>Old Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="save-btn">Update Password</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingPassword(false)}
                                    className="cancel-btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* My Posted Jobs Section */}
            <section className="jobs-section">
                <h2>My Posted Jobs</h2>
                <div className="jobs-list">
                    {jobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            applicants={applicants.filter(a => a.jobId === job.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Applicants Section - with working accept/reject buttons */}
            <section className="applicants-section">
                <h2>Applicants</h2>
                <div className="applicants-list">
                    {applicants.map(applicant => (
                        <ApplicantCard
                            key={applicant.id}
                            applicant={applicant}
                            onAccept={() => handleApplicantAction(applicant.id, 'accepted')}
                            onReject={() => handleApplicantAction(applicant.id, 'rejected')}
                        />
                    ))}
                </div>
            </section>

            {/* Company Details Modal */}
            {showCompanyModal && (
                <CompanyDetailModal
                    company={company}
                    onClose={toggleCompanyModal}
                />
            )}
        </div>
    );
};

export default EmployerAccount;