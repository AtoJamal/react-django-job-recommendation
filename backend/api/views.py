from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.hashers import make_password, check_password
from .models import Admin, Employer, JobSeeker, Job, JobApplicant, Company
from django.contrib.auth.models import User
from .serializers import EmployerRegistrationSerializer, EmployerLoginSerializer, EmployerSerializer 

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
    serializer_class = EmployerSerializer # Default serializer for retrieving/updating employers

    @action(detail=False, methods=['post'])
    def register(self, request):
        
        serializer = EmployerRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        employer = serializer.save() 
        # Optionally, we might want to log in the user immediately after registration
        # and return JWT tokens. This would involve using Simple JWT's token generation.
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = EmployerLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # After validation, serializer.validated_data will contain the `user` object
        user = serializer.validated_data['user']
        
        # --- Integrate with djangorestframework-simplejwt for token generation ---
        from rest_framework_simplejwt.tokens import RefreshToken
        
        # Function to get tokens for a user (can be placed in a utils file or similar)
        def get_tokens_for_user(user):
            refresh = RefreshToken.for_user(user)
            refresh['user_type'] = 'employer'
            refresh['employer_id'] = user.employer_profile.id 

            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }

        tokens = get_tokens_for_user(user)

        response_data = {
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'employer_id': user.employer_profile.id,
                'first_name': user.employer_profile.first_name, # Get from employer profile
                'last_name': user.employer_profile.last_name,
                'user_type': 'employer'
            },
            'access_token': tokens['access'],
            'refresh_token': tokens['refresh'],
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
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

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'employer'):
            serializer.save(employer=self.request.user.employer)
        else:
            serializer.save()

class JobApplicantViewSet(viewsets.ModelViewSet):
    queryset = JobApplicant.objects.all()
    serializer_class = JobApplicantSerializer



