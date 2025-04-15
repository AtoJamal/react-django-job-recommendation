import { motion } from 'framer-motion';
import { FiEdit } from 'react-icons/fi';

const ProfileCard = ({ profile, isEditing, onEditToggle }) => {
    return (
        <motion.div
            className="profile-card"
            whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="profile-header">
                <div className="profile-pic-container">
                    <img
                        src={profile.profilePic}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        className="profile-pic"
                    />
                    {!isEditing && (
                        <motion.button
                            className="edit-icon"
                            onClick={onEditToggle}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiEdit />
                        </motion.button>
                    )}
                </div>
                <div className="profile-info">
                    <h3>{`${profile.firstName} ${profile.lastName}`}</h3>
                    <p>{profile.email}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileCard;