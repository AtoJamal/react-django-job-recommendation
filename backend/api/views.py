from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.hashers import make_password, check_password
from .models import Admin, Employer, JobSeeker, Job, JobApplicant, Company
from .serializers import (
    AdminSerializer, 
    EmployerSerializer, 
    JobSeekerSerializer, 
    JobSerializer, 
    JobApplicantSerializer,
    CompanySerializer,
    JobSeekerLoginSerializer,
    EmployerLoginSerializer
)

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = EmployerLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        # Handle password hashing and company creation
        password = serializer.validated_data.pop('password', None)
        company_data = serializer.validated_data.pop('company', None)
        
        instance = serializer.save()
        
        if password:
            instance.password = make_password(password)
            instance.save()
        
        if company_data:
            company = Company.objects.create(**company_data)
            instance.company = company
            instance.save()

class JobSeekerViewSet(viewsets.ModelViewSet):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = JobSeekerLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        # Handle password hashing
        password = serializer.validated_data.pop('password', None)
        instance = serializer.save()
        
        if password:
            instance.password = make_password(password)
            instance.save()

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-posted_date')
    serializer_class = JobSerializer
    filter_backends = [filters.SearchFilter]  # Start with just search
    search_fields = ['job_title', 'description']  # Basic search fields

class JobApplicantViewSet(viewsets.ModelViewSet):
    queryset = JobApplicant.objects.all()
    serializer_class = JobApplicantSerializer



