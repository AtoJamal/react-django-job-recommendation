from django.contrib import admin
from .models import Admin, Company, Employer, JobSeeker, Job, JobApplicant, ClickHistory, Message, Notification, Feedback, Resume

# Register your models here.
admin.site.register(Admin)
admin.site.register(Company)
admin.site.register(Employer)
admin.site.register(JobSeeker)
admin.site.register(Job)
admin.site.register(JobApplicant)