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
    EmployerLoginSerializer,
    JobSeekerRegistrationSerializer
)


class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

    def get_permissions(self):
        if self.action in ['login', 'register']:
            return []  # No permissions required for login/register
        return super().get_permissions()

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = EmployerRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        employer = serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = EmployerLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        from rest_framework_simplejwt.tokens import RefreshToken
        
        refresh = RefreshToken.for_user(user)
        refresh['user_type'] = 'employer'
        refresh['employer_id'] = user.employer_profile.id 

        response_data = {
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'employer_id': user.employer_profile.id,
                'first_name': user.employer_profile.first_name,
                'last_name': user.employer_profile.last_name,
                'user_type': 'employer'
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import JobSeeker
from .serializers import JobSeekerRegistrationSerializer, JobSeekerLoginSerializer

class JobSeekerViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action in ['register', 'login']:
            return []  # No permissions required for login/register
        return super().get_permissions()

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = JobSeekerRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                job_seeker = serializer.save()
                
                # Generate JWT tokens
                refresh = RefreshToken.for_user(job_seeker.user)
                refresh['user_type'] = 'jobseeker'
                refresh['jobseeker_id'] = job_seeker.id

                response_data = {
                    'message': 'Registration successful',
                    'user': {
                        'id': job_seeker.user.id,
                        'email': job_seeker.user.email,
                        'username': job_seeker.user.username,
                        'jobseeker_id': job_seeker.id,
                        'first_name': job_seeker.first_name,
                        'last_name': job_seeker.last_name,
                        'user_type': 'jobseeker'
                    },
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                job_seeker = JobSeeker.objects.get(user=user)
                
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                refresh['user_type'] = 'jobseeker'
                refresh['jobseeker_id'] = job_seeker.id

                return Response({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'username': user.username,
                        'jobseeker_id': job_seeker.id,
                        'first_name': job_seeker.first_name,
                        'last_name': job_seeker.last_name,
                        'user_type': 'jobseeker'
                    },
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except (User.DoesNotExist, JobSeeker.DoesNotExist):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

class JobViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()  # Added for DRF router compatibility
    serializer_class = JobSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['job_title', 'description']

    def get_queryset(self):
        # Only show approved jobs to everyone
        return Job.objects.filter(is_approved=True).order_by('-posted_date')

    def perform_create(self, serializer):
        # Set employer and is_approved
        employer = getattr(self.request.user, 'employer_profile', None)
        if employer:
            serializer.save(employer=employer, is_approved=False)
        else:
            serializer.save(is_approved=False)

    def get_permissions(self):
        # Only authenticated users can create jobs
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return super().get_permissions()

class JobApplicantViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = JobApplicant.objects.all()
    serializer_class = JobApplicantSerializer

    def perform_create(self, serializer):
        # Get the job seeker profile for the current user
        job_seeker = self.request.user.jobseeker_profile
        serializer.save(job_seeker=job_seeker)

    def get_queryset(self):
        # Job seekers can only see their own applications
        if hasattr(self.request.user, 'jobseeker_profile'):
            return self.queryset.filter(job_seeker=self.request.user.jobseeker_profile)
        # Employers can see applications for their jobs
        elif hasattr(self.request.user, 'employer_profile'):
            return self.queryset.filter(job__employer=self.request.user.employer_profile)
        return self.queryset.none()


