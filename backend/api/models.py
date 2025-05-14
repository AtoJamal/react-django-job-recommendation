from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Admin(models.Model):
    ROLE_CHOICES = [
        ('customerSupport', 'Customer Support'),
        ('approver', 'Approver'),
        ('update', 'Update'),
        ('security', 'Security'),
    ]
    
    first_name = models.CharField(db_column='firstName', max_length=255)
    middle_name = models.CharField(db_column='middleName', max_length=255, blank=True, null=True)
    last_name = models.CharField(db_column='lastName', max_length=255)
    age = models.PositiveIntegerField(db_column='age',blank=True, null=True, validators=[MinValueValidator(18), MaxValueValidator(100)])
    gender = models.CharField(db_column='gender',max_length=255, blank=True, null=True)
    location = models.CharField(db_column='location',max_length=255, blank=True, null=True)
    email = models.EmailField(db_column='email',unique=True)
    password = models.CharField(db_column='password',max_length=255)  # Note: In production, use Django's built-in User model or extend AbstractUser
    is_email_verified = models.BooleanField(db_column='isEmailVerified',default=False)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, blank=True, null=True)

    class Meta:
        verbose_name = 'Admin'
        verbose_name_plural = 'Admins'
        db_table = 'admin'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"


class Company(models.Model):
    name = models.CharField(db_column='name',max_length=255)
    location = models.CharField(db_column='location',max_length=255, blank=True, null=True)
    number_of_employees = models.PositiveIntegerField(db_column='numberOfEmployees',blank=True, null=True)
    year_established = models.PositiveIntegerField(db_column='yearEstablished',
        blank=True, 
        null=True,
        validators=[MinValueValidator(1800), MaxValueValidator(2100)]
    )

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'
        db_table = 'company'

    def __str__(self):
        return self.name


class Employer(models.Model):
    first_name = models.CharField(db_column='firstName',max_length=255)
    middle_name = models.CharField(db_column='middleName', max_length=255, blank=True, null=True)
    last_name = models.CharField(db_column='lastName', max_length=255)
    age = models.PositiveIntegerField(db_column='age',blank=True, null=True, validators=[MinValueValidator(18), MaxValueValidator(100)])
    gender = models.CharField(db_column='gender',max_length=255, blank=True, null=True)
    location = models.CharField(db_column='location',max_length=255, blank=True, null=True)
    email = models.EmailField(db_column='email',unique=True, blank=True, null=True)
    password = models.CharField(db_column='password',max_length=255, blank=True, null=True)  # Should be hashed in production
    phone_number = models.CharField(db_column='phoneNumber',max_length=255, unique=True, blank=True, null=True)
    is_email_verified = models.BooleanField(db_column='isEmailVerified',default=False)
    company = models.ForeignKey(
        Company, 
        models.SET_NULL, 
        db_column='companyId',
        blank=True, 
        null=True,
        related_name='employers'
    )

    class Meta:
        verbose_name = 'Employer'
        verbose_name_plural = 'Employers'
        db_table = 'employer'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class JobSeeker(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    
    DEGREE_CHOICES = [
        ('Bachelor', 'Bachelor'),
        ('Master', 'Master'),
        ('PhD', 'PhD'),
        ('Diploma', 'Diploma'),
    ]
    
    FIELD_OF_STUDY_CHOICES = [
        ('Computer Science', 'Computer Science'),
        ('Engineering', 'Engineering'),
        ('Business', 'Business'),
        ('Arts', 'Arts'),
        ('Medicine', 'Medicine'),
    ]

    first_name = models.CharField(db_column='firstName', max_length=255)
    middle_name = models.CharField(db_column='middleName', max_length=255, blank=True, null=True)
    last_name = models.CharField(db_column='lastName', max_length=255)
    age = models.PositiveIntegerField(db_column='age',blank=True, null=True, validators=[MinValueValidator(16), MaxValueValidator(100)])
    gender = models.CharField(db_column='gender',max_length=6, choices=GENDER_CHOICES, blank=True, null=True)
    location = models.CharField(db_column='location',max_length=255, blank=True, null=True)
    email = models.EmailField(db_column='email',unique=True, blank=True, null=True)
    phone_number = models.CharField(db_column='phoneNumber',max_length=255, blank=True, null=True)
    is_email_verified = models.BooleanField(db_column='isEmailVerified',default=False)
    password = models.CharField(db_column='password',max_length=255, blank=True, null=True)  # Should be hashed in production
    degree = models.CharField(db_column='degree',max_length=8, choices=DEGREE_CHOICES)
    experience = models.PositiveIntegerField(db_column='experience',blank=True, null=True)
    graduation_year = models.PositiveIntegerField(db_column='graduationYear',
        blank=True, 
        null=True,
        validators=[MinValueValidator(1900), MaxValueValidator(2100)]
    )
    field_of_study = models.CharField(db_column='fieldOfStudy',max_length=16, choices=FIELD_OF_STUDY_CHOICES)

    class Meta:
        verbose_name = 'Job Seeker'
        verbose_name_plural = 'Job Seekers'
        db_table = 'jobseeker'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Job(models.Model):
    CATEGORY_CHOICES = [
        ('IT', 'IT'),
        ('Engineering', 'Engineering'),
        ('Healthcare', 'Healthcare'),
        ('Finance', 'Finance'),
        ('Marketing', 'Marketing'),
        ('Education', 'Education'),
        ('Other', 'Other'),
    ]
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]

    employer = models.ForeignKey(
        Employer,
        models.SET_NULL,
        db_column='employerId', 
        blank=True,
        null=True,
        related_name='jobs'
    )
    admin = models.ForeignKey(
        Admin,
        models.SET_NULL,
        db_column='adminId',
        blank=True,
        null=True,
        related_name='approved_jobs'
    )
    job_title = models.CharField(db_column='jobTitle', max_length=255)
    required_gender = models.CharField(
        db_column='requiredGender',
        max_length=6,
        choices=GENDER_CHOICES,
        blank=True,
        null=True
    )
    posted_date = models.DateTimeField(db_column='postedDate',auto_now_add=True)
    salary = models.DecimalField(db_column='salary',
        max_digits=10, 
        decimal_places=2, 
        blank=True, 
        null=True
    )
    category = models.CharField(db_column='category',
        max_length=11, 
        choices=CATEGORY_CHOICES, 
        blank=True, 
        null=True
    )
    required_year = models.PositiveIntegerField(
        db_column='requiredYear',
        blank=True,
        null=True
    )
    quota = models.PositiveIntegerField(db_column='quota',blank=True, null=True)
    deadline = models.DateField(db_column='deadline',blank=True, null=True)
    description = models.TextField(db_column='description',blank=True, null=True)
    status = models.CharField(db_column='status',max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'
        db_table = 'job'
        ordering = ['-posted_date']

    def __str__(self):
        return self.job_title


class JobApplicant(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('pending', 'Pending'),
    ]

    job = models.ForeignKey(
        Job,
        models.CASCADE,
        db_column='jobId',
        related_name='applicants'
    )
    job_seeker = models.ForeignKey(
        JobSeeker,
        models.CASCADE,
        db_column='jobSeekerId',
        related_name='job_applications'
    )
    application_time = models.DateTimeField(db_column='applicationTime',auto_now_add=True)
    status = models.CharField(db_column='status',
        max_length=8,
        choices=STATUS_CHOICES,
        default='pending'
    )

    class Meta:
        verbose_name = 'Job Applicant'
        verbose_name_plural = 'Job Applicants'
        db_table = 'jobapplicant'
        unique_together = ('job', 'job_seeker')
        ordering = ['-application_time']

    def __str__(self):
        return f"{self.job_seeker} applied for {self.job}"


class ClickHistory(models.Model):
    job = models.ForeignKey(
        Job,
        models.CASCADE,
        db_column='jobId',
        related_name='click_history'
    )
    job_seeker = models.ForeignKey(
        JobSeeker,
        models.CASCADE,
        db_column='jobSeekerId',
        related_name='job_clicks'
    )
    timestamp = models.DateTimeField(db_column='timeStamp',auto_now_add=True)

    class Meta:
        verbose_name = 'Click History'
        verbose_name_plural = 'Click Histories'
        db_table = 'clickhistory'
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.job_seeker} clicked on {self.job} at {self.timestamp}"


class Message(models.Model):
    content = models.TextField(db_column='message')

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        db_table = 'message'

    def __str__(self):
        return f"Message {self.id}"


class Notification(models.Model):
    job_seeker = models.ForeignKey(
        JobSeeker,
        models.CASCADE,
        db_column='jobSeekerId',
        related_name='notifications'
    )
    message = models.ForeignKey(
        Message,
        models.CASCADE,
        db_column='messageId',
        related_name='notifications'
    )
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        db_table = 'notification'
        ordering = ['-time']

    def __str__(self):
        return f"Notification for {self.job_seeker} at {self.time}"


class Feedback(models.Model):
    STATUS_CHOICES = [
        ('Read', 'Read'),
        ('unRead', 'Unread'),
    ]

    job_seeker = models.ForeignKey(
        JobSeeker,
        models.CASCADE,
        db_column='jobSeekerId',
        related_name='feedbacks'
    )
    admin = models.ForeignKey(
        Admin,
        models.SET_NULL,
        db_column='adminId',
        blank=True,
        null=True,
        related_name='feedbacks'
    )
    content = models.TextField(db_column='content')
    time = models.DateTimeField(db_column='time',auto_now_add=True)
    status = models.CharField(db_column='status',
        max_length=6,
        choices=STATUS_CHOICES,
        default='unRead'
    )

    class Meta:
        verbose_name = 'Feedback'
        verbose_name_plural = 'Feedbacks'
        db_table = 'feedback'
        ordering = ['-time']

    def __str__(self):
        return f"Feedback from {self.job_seeker}"


class Resume(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('notCompleted', 'Not Completed'),
    ]

    job_seeker = models.OneToOneField(
        JobSeeker,
        models.CASCADE,
        db_column='jobSeekerId',
        related_name='resume'
    )
    status = models.CharField(db_column='status',
        max_length=12,
        choices=STATUS_CHOICES,
        default='notCompleted'
    )

    class Meta:
        verbose_name = 'Resume'
        verbose_name_plural = 'Resumes'
        db_table = 'resume'

    def __str__(self):
        return f"Resume of {self.job_seeker} ({self.status})"