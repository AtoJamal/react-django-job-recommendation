import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiUpload } from 'react-icons/fi';

const EditableForm = ({ profile, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        profilePic: profile.profilePic,
        phone: profile.phone,
        newPassword: '',
        confirmPassword: ''
    });

    const [profileImage, setProfileImage] = useState(profile.profilePic);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result);
                setFormData(prev => ({ ...prev, profilePic: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        onSave(formData);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="editable-form"
        >
            <div className="form-group">
                <label>Profile Picture</label>
                <div className="image-upload-container">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-pic-preview"
                    />
                    <label className="upload-btn">
                        <FiUpload /> Change Photo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>New Password (leave blank to keep current)</label>
                <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                />
            </div>

            <div className="form-group">
                <label>Confirm New Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                />
            </div>

            <div className="form-actions">
                <motion.button
                    type="button"
                    onClick={onCancel}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="cancel-btn"
                >
                    <FiX /> Cancel
                </motion.button>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="save-btn"
                >
                    <FiSave /> Save Changes
                </motion.button>
            </div>
        </motion.form>
    );
};

export default EditableForm;