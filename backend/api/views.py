from rest_framework import viewsets
from .models import Admin, Employer, JobSeeker, Job, JobApplicant
from .serializers import AdminSerializer, EmployerSerializer, JobSeekerSerializer, JobSerializer, JobApplicantSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

class JobSeekerViewSet(viewsets.ModelViewSet):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobApplicantViewSet(viewsets.ModelViewSet):
    queryset = JobApplicant.objects.all()
    serializer_class = JobApplicantSerializer