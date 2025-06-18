from rest_framework import serializers
from .models import Admin, Employer, JobSeeker, Job, JobApplicant, Company
from django.contrib.auth.hashers import make_password, check_password

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class EmployerSerializer(serializers.ModelSerializer):
    company = CompanySerializer(required=False, allow_null=True)
    
    class Meta:
        model = Employer
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeeker
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class JobApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplicant
        fields = '__all__'

class JobSeekerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            job_seeker = JobSeeker.objects.get(email=email)
            if check_password(password, job_seeker.password):
                return {
                    'id': job_seeker.id,
                    'email': job_seeker.email,
                    'first_name': job_seeker.first_name,
                    'last_name': job_seeker.last_name,
                    'user_type': 'jobseeker'
                }
            raise serializers.ValidationError("Invalid credentials")
        except JobSeeker.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

class EmployerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            employer = Employer.objects.get(email=email)
            if check_password(password, employer.password):
                return {
                    'id': employer.id,
                    'email': employer.email,
                    'first_name': employer.first_name,
                    'last_name': employer.last_name,
                    'company': employer.company.id if employer.company else None,
                    'user_type': 'employer'
                }
            raise serializers.ValidationError("Invalid credentials")
        except Employer.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")