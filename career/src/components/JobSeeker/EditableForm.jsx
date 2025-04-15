import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX } from 'react-icons/fi';

const EditableForm = ({ profile, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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