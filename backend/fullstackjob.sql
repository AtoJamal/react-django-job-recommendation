-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2025 at 10:11 PM
-- Server version: 11.7.2-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fullstackjob`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isEmailVerified` tinyint(1) DEFAULT NULL,
  `role` enum('customerSupport','approver','update','security') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstName`, `middleName`, `lastName`, `age`, `gender`, `location`, `email`, `password`, `isEmailVerified`, `role`) VALUES
(1, 'jemal', 'hussen', 'hassen', 22, 'male', 'dessie', 'sultanmimore@gmail.com', 'jemal123', 1, 'approver');

-- --------------------------------------------------------

--
-- Stand-in structure for view `adminactivityview`
-- (See below for the actual view)
--
CREATE TABLE `adminactivityview` (
`adminId` int(11)
,`firstName` varchar(255)
,`middleName` varchar(255)
,`lastName` varchar(255)
,`jobId` int(11)
,`jobTitle` varchar(255)
,`jobStatus` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add Admin', 7, 'add_admin'),
(26, 'Can change Admin', 7, 'change_admin'),
(27, 'Can delete Admin', 7, 'delete_admin'),
(28, 'Can view Admin', 7, 'view_admin'),
(29, 'Can add Company', 8, 'add_company'),
(30, 'Can change Company', 8, 'change_company'),
(31, 'Can delete Company', 8, 'delete_company'),
(32, 'Can view Company', 8, 'view_company'),
(33, 'Can add Job Seeker', 9, 'add_jobseeker'),
(34, 'Can change Job Seeker', 9, 'change_jobseeker'),
(35, 'Can delete Job Seeker', 9, 'delete_jobseeker'),
(36, 'Can view Job Seeker', 9, 'view_jobseeker'),
(37, 'Can add Message', 10, 'add_message'),
(38, 'Can change Message', 10, 'change_message'),
(39, 'Can delete Message', 10, 'delete_message'),
(40, 'Can view Message', 10, 'view_message'),
(41, 'Can add Employer', 11, 'add_employer'),
(42, 'Can change Employer', 11, 'change_employer'),
(43, 'Can delete Employer', 11, 'delete_employer'),
(44, 'Can view Employer', 11, 'view_employer'),
(45, 'Can add Job', 12, 'add_job'),
(46, 'Can change Job', 12, 'change_job'),
(47, 'Can delete Job', 12, 'delete_job'),
(48, 'Can view Job', 12, 'view_job'),
(49, 'Can add Feedback', 13, 'add_feedback'),
(50, 'Can change Feedback', 13, 'change_feedback'),
(51, 'Can delete Feedback', 13, 'delete_feedback'),
(52, 'Can view Feedback', 13, 'view_feedback'),
(53, 'Can add Click History', 14, 'add_clickhistory'),
(54, 'Can change Click History', 14, 'change_clickhistory'),
(55, 'Can delete Click History', 14, 'delete_clickhistory'),
(56, 'Can view Click History', 14, 'view_clickhistory'),
(57, 'Can add Notification', 15, 'add_notification'),
(58, 'Can change Notification', 15, 'change_notification'),
(59, 'Can delete Notification', 15, 'delete_notification'),
(60, 'Can view Notification', 15, 'view_notification'),
(61, 'Can add Resume', 16, 'add_resume'),
(62, 'Can change Resume', 16, 'change_resume'),
(63, 'Can delete Resume', 16, 'delete_resume'),
(64, 'Can view Resume', 16, 'view_resume'),
(65, 'Can add Job Applicant', 17, 'add_jobapplicant'),
(66, 'Can change Job Applicant', 17, 'change_jobapplicant'),
(67, 'Can delete Job Applicant', 17, 'delete_jobapplicant'),
(68, 'Can view Job Applicant', 17, 'view_jobapplicant');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$1000000$cwgOq4hRqHfRpzrvR7XLW7$nDry+3ZIUMHTLIaCihCLcZpb5cHXTCNSEnr3HysIPBY=', '2025-06-18 09:42:26.082175', 1, 'admin', '', '', 'sultanmimore@gmail.com', 1, 1, '2025-05-14 07:28:56.651710'),
(2, 'pbkdf2_sha256$1000000$1AA8mXnN5Y3KRIpOLrj9y6$tcDacetA57GYxxJLfWNJVOHNGSIYZ5B3XfcCVd3F5/s=', NULL, 0, 'guzamn', '', '', 'guzman@gmail.com', 0, 1, '2025-06-21 19:22:05.361073'),
(3, 'pbkdf2_sha256$1000000$7tPOtWoB4mdLliaqlO6WLY$tS5FxIJwUcak0TA2T/CkEMT7TzqNS4429WORVgK90Y8=', NULL, 0, 'jackuen', '', '', 'jackuenguzman@gmail.com', 0, 1, '2025-06-21 20:45:33.105949');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clickhistory`
--

CREATE TABLE `clickhistory` (
  `id` int(11) NOT NULL,
  `timeStamp` datetime DEFAULT NULL,
  `jobId` int(11) DEFAULT NULL,
  `jobSeekerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `clickhistorydetails`
-- (See below for the actual view)
--
CREATE TABLE `clickhistorydetails` (
`clickHistoryId` int(11)
,`clickTimeStamp` datetime
,`jobSeekerId` int(11)
,`jobSeekerFirstName` varchar(255)
,`jobSeekerMiddleName` varchar(255)
,`jobSeekerLastName` varchar(255)
,`jobSeekerLocation` varchar(255)
,`jobSeekerPhoneNumber` varchar(255)
,`jobSeekerGender` enum('Male','Female')
,`jobSeekerFieldOfStudy` enum('Computer Science','Engineering','Business','Arts','Medicine')
,`jobId` int(11)
,`jobTitle` varchar(255)
,`employerId` int(11)
,`employerFirstName` varchar(255)
,`employerMiddleName` varchar(255)
,`employerLastName` varchar(255)
,`employerEmail` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `numberOfEmployees` int(11) DEFAULT NULL,
  `yearEstablished` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `location`, `numberOfEmployees`, `yearEstablished`) VALUES
(1, 'dessie', 'dessie', 45, 2025),
(2, 'alex express', 'new yourk', 23, 2012),
(3, 'guzman express', 'bejing', 12000, 2006);

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-06-10 09:42:20.328270', '1', 'dessie', 1, '[{\"added\": {}}]', 8, 1),
(2, '2025-06-10 09:43:04.238769', '2', 'tomas tomas', 1, '[{\"added\": {}}]', 11, 1),
(3, '2025-06-10 09:44:28.670789', '2', 'tomas tomas', 3, '', 11, 1),
(4, '2025-06-13 23:05:30.822188', '8', 'habib habib', 1, '[{\"added\": {}}]', 9, 1),
(5, '2025-06-13 23:06:39.070289', '1', 'habib habib applied for dgffh', 1, '[{\"added\": {}}]', 17, 1),
(6, '2025-06-18 15:59:36.497585', '1', 'jemal hassen (sultanmimore@gmail.com)', 1, '[{\"added\": {}}]', 7, 1),
(7, '2025-06-18 16:00:04.354596', '3', 'dgffh', 3, '', 12, 1),
(8, '2025-06-18 16:01:58.675067', '4', 'web developer', 1, '[{\"added\": {}}]', 12, 1),
(9, '2025-06-18 17:21:37.083763', '5', 'Larava Developer', 1, '[{\"added\": {}}]', 12, 1),
(10, '2025-06-18 17:23:53.377468', '6', 'React.js + Firebase Developer', 1, '[{\"added\": {}}]', 12, 1),
(11, '2025-06-18 17:25:15.934203', '7', 'Experiance full stack developer', 1, '[{\"added\": {}}]', 12, 1),
(12, '2025-06-18 17:26:45.373214', '8', 'Video Editor', 1, '[{\"added\": {}}]', 12, 1),
(13, '2025-06-18 18:34:50.588804', '8', 'Video Editor', 2, '[{\"changed\": {\"fields\": [\"Location\"]}}]', 12, 1),
(14, '2025-06-18 18:35:44.483572', '8', 'Video Editor', 2, '[{\"changed\": {\"fields\": [\"Location\"]}}]', 12, 1),
(15, '2025-06-18 18:37:00.191469', '7', 'Experiance full stack developer', 2, '[{\"changed\": {\"fields\": [\"Location\"]}}]', 12, 1),
(16, '2025-06-18 18:37:22.041131', '6', 'React.js + Firebase Developer', 2, '[{\"changed\": {\"fields\": [\"Location\"]}}]', 12, 1),
(17, '2025-06-18 18:37:32.792119', '5', 'Larava Developer', 2, '[{\"changed\": {\"fields\": [\"Location\"]}}]', 12, 1),
(18, '2025-06-18 18:39:33.367356', '4', 'web developer', 2, '[{\"changed\": {\"fields\": [\"Deadline\"]}}]', 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(7, 'api', 'admin'),
(14, 'api', 'clickhistory'),
(8, 'api', 'company'),
(11, 'api', 'employer'),
(13, 'api', 'feedback'),
(12, 'api', 'job'),
(17, 'api', 'jobapplicant'),
(9, 'api', 'jobseeker'),
(10, 'api', 'message'),
(15, 'api', 'notification'),
(16, 'api', 'resume'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-05-14 07:13:06.242180'),
(2, 'auth', '0001_initial', '2025-05-14 07:13:22.510567'),
(3, 'admin', '0001_initial', '2025-05-14 07:13:26.361245'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-05-14 07:13:26.464193'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-05-14 07:13:26.526053'),
(6, 'api', '0001_initial', '2025-05-14 07:21:10.008985'),
(7, 'contenttypes', '0002_remove_content_type_name', '2025-05-14 07:21:11.236745'),
(8, 'auth', '0002_alter_permission_name_max_length', '2025-05-14 07:21:11.822028'),
(9, 'auth', '0003_alter_user_email_max_length', '2025-05-14 07:21:12.204202'),
(10, 'auth', '0004_alter_user_username_opts', '2025-05-14 07:21:12.235292'),
(11, 'auth', '0005_alter_user_last_login_null', '2025-05-14 07:21:12.789100'),
(12, 'auth', '0006_require_contenttypes_0002', '2025-05-14 07:21:12.809089'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2025-05-14 07:21:12.853825'),
(14, 'auth', '0008_alter_user_username_max_length', '2025-05-14 07:21:13.225027'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2025-05-14 07:21:13.740839'),
(16, 'auth', '0010_alter_group_name_max_length', '2025-05-14 07:21:14.141852'),
(17, 'auth', '0011_update_proxy_permissions', '2025-05-14 07:21:14.180356'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2025-05-14 07:21:14.476615'),
(19, 'sessions', '0001_initial', '2025-05-14 07:21:14.986818'),
(20, 'api', '0002_alter_admin_options_alter_clickhistory_options_and_more', '2025-06-20 07:15:35.511478'),
(21, 'api', '0003_employer_user', '2025-06-20 15:12:18.351934'),
(22, 'api', '0004_alter_job_options', '2025-06-24 20:07:59.307168');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('hxl2ixd8a1csn2npg3taewydr19hlga4', '.eJxVjDkOwjAQAP_iGlm-D0r6vMHarNc4gBwpTirE35GlFNDOjObNEhx7TUenLS2ZXZlkl182Az6pDZEf0O4rx7Xt2zLzkfDTdj6tmV63s_0bVOh1bBGCKxRJBWuKFk5LQONVMLFEGwSCyxjRKx2FdUaJAJA1eRNENiQl-3wBz6c3HA:1uRpJK:8rTkzGuXCi5Fb-Qy_p69bN51jVBFe5znwHkyASH6R8Y', '2025-07-02 09:42:26.181547'),
('p6tzk7v5q8k2amcwyi71jgim4ddupsj2', '.eJxVjDkOwjAQAP_iGlm-D0r6vMHarNc4gBwpTirE35GlFNDOjObNEhx7TUenLS2ZXZlkl182Az6pDZEf0O4rx7Xt2zLzkfDTdj6tmV63s_0bVOh1bBGCKxRJBWuKFk5LQONVMLFEGwSCyxjRKx2FdUaJAJA1eRNENiQl-3wBz6c3HA:1uGjVE:bohX9KWoymV-UpyjQZrpUCUZBybiYNFTwl0CYd4AKmQ', '2025-06-01 19:16:52.491407');

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `isEmailVerified` tinyint(1) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employer`
--

INSERT INTO `employer` (`id`, `firstName`, `middleName`, `lastName`, `age`, `gender`, `location`, `email`, `password`, `phoneNumber`, `isEmailVerified`, `companyId`, `user_id`) VALUES
(3, 'alex', 'mahon', 'alex', 36, 'Male', 'us', 'alex.express@gmail.com', 'pbkdf2_sha256$1000000$9h0iyCOLSVu05yPL2yBJN4$CZiPX6DABtntvx3Pu/W31JkHSxvH40mDW+3nOsL7ItM=', '+1456756767', 0, 2, NULL),
(4, 'guzam', 'guzman', 'guzman', 34, 'Female', 'guatimala', 'guzman@gmail.com', '', '+55234456456', 0, 3, 2),
(5, 'jackue', 'leora', 'guzman', 45, 'Male', 'guatimala city', 'jackuenguzman@gmail.com', '', '+55345456556', 0, NULL, 3);

-- --------------------------------------------------------

--
-- Stand-in structure for view `employerview`
-- (See below for the actual view)
--
CREATE TABLE `employerview` (
`employerId` int(11)
,`employerFirstName` varchar(255)
,`employerLastName` varchar(255)
,`employerEmail` varchar(255)
,`employerPhoneNumber` varchar(255)
,`companyId` int(11)
,`companyName` varchar(255)
,`companyLocation` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `jobSeekerId` int(11) DEFAULT NULL,
  `adminId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `status` enum('Read','unRead') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `feedbackdetails`
-- (See below for the actual view)
--
CREATE TABLE `feedbackdetails` (
`feedbackId` int(11)
,`feedbackContent` text
,`feedbackTime` datetime
,`feedbackStatus` enum('Read','unRead')
,`jobSeekerId` int(11)
,`jobSeekerFirstName` varchar(255)
,`jobSeekerMiddleName` varchar(255)
,`jobSeekerLastName` varchar(255)
,`adminId` int(11)
,`adminFirstName` varchar(255)
,`adminLastName` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `employerId` int(11) DEFAULT NULL,
  `adminId` int(11) DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `requiredGender` enum('Male','Female') DEFAULT NULL,
  `postedDate` datetime DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `category` enum('IT','Engineering','Healthcare','Finance','Marketing','Education','Other') DEFAULT NULL,
  `requiredYear` int(11) DEFAULT NULL,
  `quota` int(11) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `employerId`, `adminId`, `jobTitle`, `requiredGender`, `postedDate`, `salary`, `category`, `requiredYear`, `quota`, `deadline`, `description`, `status`, `location`) VALUES
(4, 3, 1, 'web developer', 'Male', '2025-06-18 16:01:58', 25000.00, 'IT', 3, 3, '2025-06-26', 'we are looking for a full stack django developer', 'aproved', 'addis ababa'),
(5, 3, 1, 'Larava Developer', 'Female', '2025-06-18 17:21:36', 15000.00, 'Education', 2, 4, '2025-06-24', 'We are looking for a Larava developer to join our team', 'apprived', 'Remote'),
(6, 3, 1, 'React.js + Firebase Developer', 'Male', '2025-06-18 17:23:53', 15000.00, 'Marketing', 3, 2, '2025-06-19', '- Strong experience with React.js and component-based design.\r\n- Solid knowledge of Firebase suite: Auth, Firestore, Storage, and Hosting.\r\n- Develop a fully responsive React.js frontend.\r\n- Set up Firestore Database for storing movie metadata (title, description, categories).\r\n- Integrate Firebase Storage or external streaming links for videos.\r\n- Create a clean UI with categories, search, and video playback interface.\r\n- Familiarity with responsive web design (mobile-first).\r\n- Clean coding practices and Git version control.\r\n- Deploy the webapp using Firebase Hosting.', 'approved', 'Dessie'),
(7, 3, 1, 'Experiance full stack developer', NULL, '2025-06-18 17:25:15', 20000.00, 'IT', 2, 1, '2025-06-21', 'We need a talented full-stack developer who meets the following requirements:\r\n\r\n• Able to work in the office most of the time and remotely\r\n\r\n• Available for full-time work\r\n\r\n• Should have experience with Flutter, React, and Node.js\r\n\r\n• Must be able to show a real portfolio\r\n\r\n• Able to start soon \r\n\r\nRequirements:\r\n Nodejs \r\nReact \r\nFlutter \r\n\r\nRole & Responsibilities:\r\n Software development', 'pending', 'Remote'),
(8, 3, 1, 'Video Editor', 'Female', '2025-06-18 17:26:45', 23000.00, NULL, 2, 2, '2025-06-19', 'We are seeking a creative and detail-oriented Video Editor to join our team on a contractual basis. The ideal candidate should have experience editing short-form and long-form video content for digital platforms, a strong sense of storytelling, and the ability to work independently in a remote setting.', 'approved', 'Gondar'),
(9, NULL, NULL, 'Odoo developer', NULL, '2025-06-19 01:16:17', 50000.00, 'IT', 1, 3, '2025-06-25', 'We are looking for efficient odoo developer who has proven experience in atleast the following specific tasks:\n1. Fully handle odoo entire modules \n2. VPS server efficient including security\n3. CI/CD integration\n4. Deciplined and able to work full time.', NULL, 'Hawassa'),
(10, NULL, NULL, 'Accounting', NULL, '2025-06-21 19:24:32', 15000.00, 'IT', 2, 1, '2025-06-25', 'we are looking for a good accountant', NULL, 'gondar'),
(11, NULL, NULL, 'Web Designer', NULL, '2025-06-23 07:27:14', 25000.00, 'IT', 4, 3, '2025-06-28', 'We are looking for a react js frontend developer', NULL, 'Remote');

-- --------------------------------------------------------

--
-- Table structure for table `jobapplicant`
--

CREATE TABLE `jobapplicant` (
  `id` int(11) NOT NULL,
  `jobId` int(11) DEFAULT NULL,
  `jobSeekerId` int(11) DEFAULT NULL,
  `applicationTime` datetime DEFAULT NULL,
  `status` enum('approved','rejected','pending') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `jobapplicatview`
-- (See below for the actual view)
--
CREATE TABLE `jobapplicatview` (
`applicationId` int(11)
,`jobTitle` varchar(255)
,`jobSeekerFirstName` varchar(255)
,`jobSeekerLastName` varchar(255)
,`jobSeekerEmail` varchar(255)
,`applicationTime` datetime
,`status` enum('approved','rejected','pending')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `jobdetailsview`
-- (See below for the actual view)
--
CREATE TABLE `jobdetailsview` (
`jobId` int(11)
,`jobTitle` varchar(255)
,`category` enum('IT','Engineering','Healthcare','Finance','Marketing','Education','Other')
,`salary` decimal(10,2)
,`employerFirstName` varchar(255)
,`employerLastName` varchar(255)
,`companyName` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `jobseeker`
--

CREATE TABLE `jobseeker` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `isEmailVerified` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `degree` enum('Bachelor','Master','PhD','Diploma') NOT NULL,
  `experience` int(11) DEFAULT NULL,
  `graduationYear` int(11) DEFAULT NULL,
  `fieldOfStudy` enum('Computer Science','Engineering','Business','Arts','Medicine') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobseeker`
--

INSERT INTO `jobseeker` (`id`, `firstName`, `middleName`, `lastName`, `age`, `gender`, `location`, `email`, `phoneNumber`, `isEmailVerified`, `password`, `degree`, `experience`, `graduationYear`, `fieldOfStudy`) VALUES
(7, 'habib', 'mob', 'mob', 32, 'Male', 'addis baba', 'habib@gmail.com', '+2519564565', 0, 'pbkdf2_sha256$1000000$qgeslHZeK5NYeWQzZTzPEU$U7sSMVD67eaWCTCw6p4xBM4KGHAsqHIvjR9gveee1a4=', 'PhD', 10, 2014, 'Medicine'),
(8, 'habib', 'habib', 'habib', 23, 'Female', 'addis', 'addis@gmail.com', '+251906365418', 1, 'abc@1234', 'PhD', 10, 1900, 'Arts'),
(9, 'abcde', 'abcde', 'abcde', 44, 'Female', 'addis', 'abc@gmail.com', '+251945873445', 0, 'pbkdf2_sha256$1000000$D3D6Sd77SYVeRzuCuZ1rS8$CuqxQrxoBYmVdIVJPcyYgfmqruWztlTc5CtQpYqTSag=', 'Master', 3, 2014, 'Business'),
(10, 'sara', 'mickael', 'jordan', 25, 'Female', 'addis', 'sara@gmail.com', '+251923458756', 0, 'pbkdf2_sha256$1000000$jMcCBBhurL9lDHwXnrD6GJ$yetjHMr++/DeKz/E/8qC4H+ukLUXkVB1B2djvVcmonA=', 'Master', 1, 2022, 'Engineering');

-- --------------------------------------------------------

--
-- Stand-in structure for view `jobseekerdetails`
-- (See below for the actual view)
--
CREATE TABLE `jobseekerdetails` (
`jobSeekerId` int(11)
,`jobSeekerFirstName` varchar(255)
,`jobSeekerMiddleName` varchar(255)
,`jobSeekerLastName` varchar(255)
,`jobSeekerAge` int(11)
,`jobSeekerGender` enum('Male','Female')
,`jobSeekerLocation` varchar(255)
,`jobSeekerEmail` varchar(255)
,`jobSeekerPhoneNumber` varchar(255)
,`jobSeekerIsEmailVerified` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `time` datetime DEFAULT NULL,
  `jobSeekerId` int(11) DEFAULT NULL,
  `messageId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `notificationdetails`
-- (See below for the actual view)
--
CREATE TABLE `notificationdetails` (
`notificationId` int(11)
,`notificationTime` datetime
,`jobSeekerId` int(11)
,`jobSeekerFirstName` varchar(255)
,`jobSeekerMiddleName` varchar(255)
,`jobSeekerLastName` varchar(255)
,`messageContent` text
);

-- --------------------------------------------------------

--
-- Table structure for table `resume`
--

CREATE TABLE `resume` (
  `id` int(11) NOT NULL,
  `jobSeekerId` int(11) DEFAULT NULL,
  `status` enum('completed','notCompleted') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `resumedetails`
-- (See below for the actual view)
--
CREATE TABLE `resumedetails` (
`resumeId` int(11)
,`jobSeekerId` int(11)
,`jobSeekerFirstName` varchar(255)
,`jobSeekerMiddleName` varchar(255)
,`jobSeekerLastName` varchar(255)
,`jobSeekerEmail` varchar(255)
,`jobSeekerGender` enum('Male','Female')
,`jobSeekerAge` int(11)
,`jobSeekerLocation` varchar(255)
,`jobSkeerDegree` enum('Bachelor','Master','PhD','Diploma')
,`jobSeekerGraduationYear` int(11)
,`resumeStatus` enum('completed','notCompleted')
);

-- --------------------------------------------------------

--
-- Structure for view `adminactivityview`
--
DROP TABLE IF EXISTS `adminactivityview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `adminactivityview`  AS SELECT `a`.`id` AS `adminId`, `a`.`firstName` AS `firstName`, `a`.`middleName` AS `middleName`, `a`.`lastName` AS `lastName`, `j`.`id` AS `jobId`, `j`.`jobTitle` AS `jobTitle`, `j`.`status` AS `jobStatus` FROM (`admin` `a` join `job` `j` on(`a`.`id` = `j`.`adminId`)) ;

-- --------------------------------------------------------

--
-- Structure for view `clickhistorydetails`
--
DROP TABLE IF EXISTS `clickhistorydetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `clickhistorydetails`  AS SELECT `ch`.`id` AS `clickHistoryId`, `ch`.`timeStamp` AS `clickTimeStamp`, `js`.`id` AS `jobSeekerId`, `js`.`firstName` AS `jobSeekerFirstName`, `js`.`middleName` AS `jobSeekerMiddleName`, `js`.`lastName` AS `jobSeekerLastName`, `js`.`location` AS `jobSeekerLocation`, `js`.`phoneNumber` AS `jobSeekerPhoneNumber`, `js`.`gender` AS `jobSeekerGender`, `js`.`fieldOfStudy` AS `jobSeekerFieldOfStudy`, `j`.`id` AS `jobId`, `j`.`jobTitle` AS `jobTitle`, `e`.`id` AS `employerId`, `e`.`firstName` AS `employerFirstName`, `e`.`middleName` AS `employerMiddleName`, `e`.`lastName` AS `employerLastName`, `e`.`email` AS `employerEmail` FROM (((`clickhistory` `ch` join `jobseeker` `js` on(`ch`.`jobSeekerId` = `js`.`id`)) join `job` `j` on(`ch`.`jobId` = `j`.`id`)) join `employer` `e` on(`j`.`employerId` = `e`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `employerview`
--
DROP TABLE IF EXISTS `employerview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `employerview`  AS SELECT `e`.`id` AS `employerId`, `e`.`firstName` AS `employerFirstName`, `e`.`lastName` AS `employerLastName`, `e`.`email` AS `employerEmail`, `e`.`phoneNumber` AS `employerPhoneNumber`, `c`.`id` AS `companyId`, `c`.`name` AS `companyName`, `c`.`location` AS `companyLocation` FROM (`employer` `e` left join `company` `c` on(`e`.`companyId` = `c`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `feedbackdetails`
--
DROP TABLE IF EXISTS `feedbackdetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `feedbackdetails`  AS SELECT `f`.`id` AS `feedbackId`, `f`.`content` AS `feedbackContent`, `f`.`time` AS `feedbackTime`, `f`.`status` AS `feedbackStatus`, `js`.`id` AS `jobSeekerId`, `js`.`firstName` AS `jobSeekerFirstName`, `js`.`middleName` AS `jobSeekerMiddleName`, `js`.`lastName` AS `jobSeekerLastName`, `a`.`id` AS `adminId`, `a`.`firstName` AS `adminFirstName`, `a`.`lastName` AS `adminLastName` FROM ((`feedback` `f` join `jobseeker` `js` on(`f`.`jobSeekerId` = `js`.`id`)) left join `admin` `a` on(`f`.`adminId` = `a`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `jobapplicatview`
--
DROP TABLE IF EXISTS `jobapplicatview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `jobapplicatview`  AS SELECT `ja`.`id` AS `applicationId`, `j`.`jobTitle` AS `jobTitle`, `js`.`firstName` AS `jobSeekerFirstName`, `js`.`lastName` AS `jobSeekerLastName`, `js`.`email` AS `jobSeekerEmail`, `ja`.`applicationTime` AS `applicationTime`, `ja`.`status` AS `status` FROM ((`jobapplicant` `ja` join `job` `j` on(`ja`.`jobId` = `j`.`id`)) join `jobseeker` `js` on(`ja`.`jobSeekerId` = `js`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `jobdetailsview`
--
DROP TABLE IF EXISTS `jobdetailsview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `jobdetailsview`  AS SELECT `j`.`id` AS `jobId`, `j`.`jobTitle` AS `jobTitle`, `j`.`category` AS `category`, `j`.`salary` AS `salary`, `e`.`firstName` AS `employerFirstName`, `e`.`lastName` AS `employerLastName`, `c`.`name` AS `companyName` FROM ((`job` `j` join `employer` `e` on(`j`.`employerId` = `e`.`id`)) left join `company` `c` on(`e`.`companyId` = `c`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `jobseekerdetails`
--
DROP TABLE IF EXISTS `jobseekerdetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `jobseekerdetails`  AS SELECT `js`.`id` AS `jobSeekerId`, `js`.`firstName` AS `jobSeekerFirstName`, `js`.`middleName` AS `jobSeekerMiddleName`, `js`.`lastName` AS `jobSeekerLastName`, `js`.`age` AS `jobSeekerAge`, `js`.`gender` AS `jobSeekerGender`, `js`.`location` AS `jobSeekerLocation`, `js`.`email` AS `jobSeekerEmail`, `js`.`phoneNumber` AS `jobSeekerPhoneNumber`, `js`.`isEmailVerified` AS `jobSeekerIsEmailVerified` FROM `jobseeker` AS `js` ;

-- --------------------------------------------------------

--
-- Structure for view `notificationdetails`
--
DROP TABLE IF EXISTS `notificationdetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `notificationdetails`  AS SELECT `n`.`id` AS `notificationId`, `n`.`time` AS `notificationTime`, `js`.`id` AS `jobSeekerId`, `js`.`firstName` AS `jobSeekerFirstName`, `js`.`middleName` AS `jobSeekerMiddleName`, `js`.`lastName` AS `jobSeekerLastName`, `m`.`content` AS `messageContent` FROM ((`notification` `n` join `jobseeker` `js` on(`n`.`jobSeekerId` = `js`.`id`)) join `message` `m` on(`n`.`messageId` = `m`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `resumedetails`
--
DROP TABLE IF EXISTS `resumedetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `resumedetails`  AS SELECT `r`.`id` AS `resumeId`, `js`.`id` AS `jobSeekerId`, `js`.`firstName` AS `jobSeekerFirstName`, `js`.`middleName` AS `jobSeekerMiddleName`, `js`.`lastName` AS `jobSeekerLastName`, `js`.`email` AS `jobSeekerEmail`, `js`.`gender` AS `jobSeekerGender`, `js`.`age` AS `jobSeekerAge`, `js`.`location` AS `jobSeekerLocation`, `js`.`degree` AS `jobSkeerDegree`, `js`.`graduationYear` AS `jobSeekerGraduationYear`, `r`.`status` AS `resumeStatus` FROM (`resume` `r` join `jobseeker` `js` on(`r`.`jobSeekerId` = `js`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `clickhistory`
--
ALTER TABLE `clickhistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobId` (`jobId`),
  ADD KEY `jobSeekerId` (`jobSeekerId`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `employer`
--
ALTER TABLE `employer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobSeekerId` (`jobSeekerId`),
  ADD KEY `adminId` (`adminId`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employerId` (`employerId`),
  ADD KEY `adminId` (`adminId`);

--
-- Indexes for table `jobapplicant`
--
ALTER TABLE `jobapplicant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobId` (`jobId`),
  ADD KEY `jobSeekerId` (`jobSeekerId`);

--
-- Indexes for table `jobseeker`
--
ALTER TABLE `jobseeker`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobSeekerId` (`jobSeekerId`),
  ADD KEY `messageId` (`messageId`);

--
-- Indexes for table `resume`
--
ALTER TABLE `resume`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobSeekerId` (`jobSeekerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clickhistory`
--
ALTER TABLE `clickhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `employer`
--
ALTER TABLE `employer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `jobapplicant`
--
ALTER TABLE `jobapplicant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobseeker`
--
ALTER TABLE `jobseeker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resume`
--
ALTER TABLE `resume`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `clickhistory`
--
ALTER TABLE `clickhistory`
  ADD CONSTRAINT `clickhistory_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `job` (`id`),
  ADD CONSTRAINT `clickhistory_ibfk_2` FOREIGN KEY (`jobSeekerId`) REFERENCES `jobseeker` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `employer`
--
ALTER TABLE `employer`
  ADD CONSTRAINT `employer_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`),
  ADD CONSTRAINT `employer_user_id_81669240_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`jobSeekerId`) REFERENCES `jobseeker` (`id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`);

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `job_ibfk_1` FOREIGN KEY (`employerId`) REFERENCES `employer` (`id`),
  ADD CONSTRAINT `job_ibfk_2` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`);

--
-- Constraints for table `jobapplicant`
--
ALTER TABLE `jobapplicant`
  ADD CONSTRAINT `jobapplicant_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `job` (`id`),
  ADD CONSTRAINT `jobapplicant_ibfk_2` FOREIGN KEY (`jobSeekerId`) REFERENCES `jobseeker` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`jobSeekerId`) REFERENCES `jobseeker` (`id`),
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`);

--
-- Constraints for table `resume`
--
ALTER TABLE `resume`
  ADD CONSTRAINT `resume_ibfk_1` FOREIGN KEY (`jobSeekerId`) REFERENCES `jobseeker` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
