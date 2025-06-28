import { useState } from 'react';
import NotificationCard from '../../components/JobSeeker/NotificationCard';
import '../../styles/pages/JobSeeker/NotificationList.css';

const NotificationList = () => {
   
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            subject: 'Your application has been reviewed',
            company: 'TechCorp Inc.',
            message: 'We have reviewed your application for the Frontend Developer position and would like to schedule an interview.',
            time: '2023-06-15T10:30:00Z',
            isRead: false
        },
        {
            id: 2,
            subject: 'New job matches your profile',
            company: 'DesignHub',
            message: '3 new job openings match your skills and experience. Click to view recommendations.',
            time: '2023-06-14T15:45:00Z',
            isRead: false
        },
        {
            id: 3,
            subject: 'Application deadline reminder',
            company: 'DataSystems',
            message: 'The application deadline for Data Analyst position is tomorrow. Complete your application if interested.',
            time: '2023-06-13T09:15:00Z',
            isRead: true
        },
        {
            id: 4,
            subject: 'System maintenance notification',
            company: 'System',
            message: 'We will be performing scheduled maintenance this weekend. The platform will be unavailable from 2AM to 4AM EAT.',
            time: '2023-06-12T18:00:00Z',
            isRead: false
        }
    ]);

    const [expandedNotification, setExpandedNotification] = useState(null);

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        ));
    };

    const toggleExpand = (id) => {
        if (expandedNotification === id) {
            setExpandedNotification(null);
        } else {
            setExpandedNotification(id);
            markAsRead(id);
        }
    };

    const formatTime = (timestamp) => {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else {
            return notificationTime.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    return (
        <div className="notification-page">
            <div className="notification-header">
                <h1>Notifications</h1>
                <p className="unread-count">
                    {notifications.filter(n => !n.isRead).length} unread
                </p>
            </div>

            <div className="notification-list">
                {notifications.map(notification => (
                    <NotificationCard
                        key={notification.id}
                        subject={notification.subject}
                        company={notification.company}
                        time={formatTime(notification.time)}
                        message={notification.message}
                        isRead={notification.isRead}
                        isExpanded={expandedNotification === notification.id}
                        onToggle={() => toggleExpand(notification.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationList;