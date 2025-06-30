from rest_framework import serializers
from .models import Admin, Employer, JobSeeker, Job, JobApplicant, Company
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User 



class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class EmployerSerializer(serializers.ModelSerializer):

    company = CompanySerializer(required=False, allow_null=True)

    user_username = serializers.CharField(source='user.username', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Employer
        fields = [
            'id', 'first_name', 'middle_name', 'last_name', 'age', 'gender',
            'location', 'email', 'phone_number', 'is_email_verified',
            'company', 'user_username', 'user_email' 
        ]

    def create(self, validated_data):
        # This serializer is primarily for retrieving/updating existing Employer profiles,
        # not for initial registration, which is handled by EmployerRegistrationSerializer.
        pass

    def update(self, instance, validated_data):
        # Handle updating company data if nested writable serializer is needed
        company_data = validated_data.pop('company', None)
        if company_data and instance.company:
            # Update existing company
            company_serializer = CompanySerializer(instance.company, data=company_data, partial=True)
            company_serializer.is_valid(raise_exception=True)
            company_serializer.save()
        elif company_data and not instance.company:
            # Create new company if none exists
            company = Company.objects.create(**company_data)
            instance.company = company

        # Update other Employer fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance



class JobSeekerRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = JobSeeker
        fields = [
            'first_name', 'middle_name', 'last_name', 'age', 'gender',
            'location', 'email', 'phone_number', 'username', 'password', 'password2',
            'degree', 'experience', 'graduation_year', 'field_of_study'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        
        if len(data['password']) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})

        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "A user with that username already exists."})
        
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "A user with that email already exists."})

        return data

    def create(self, validated_data):
        # Extract user creation data
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        validated_data.pop('password2')
        
        # Create Django User
        user = User.objects.create_user(
            username=username,
            email=validated_data.get('email'),
            password=password
        )
        
        # Create JobSeeker profile
        job_seeker = JobSeeker.objects.create(user=user, **validated_data)
        return job_seeker
class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeeker
        fields = '__all__'
        read_only_fields = ['password', 'user']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['employer', 'is_approved']

class JobApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplicant
        fields = '__all__'
        extra_kwargs = {
            'certificate': {'required': False},
            'resume': {'required': False}  # Changed from required=True
        }

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

class EmployerRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True) 

    company = CompanySerializer(required=False, allow_null=True)

    class Meta:
        model = Employer
        fields = [
            'first_name', 'middle_name', 'last_name', 'age', 'gender',
            'location', 'email', 'phone_number', 'is_email_verified',
            'company', 'username', 'password', 'password2'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True} 
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        
        if len(data['password']) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})

        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "A user with that username already exists."})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "A user with that email already exists."})

        return data

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        validated_data.pop('password2') 

        company_data = validated_data.pop('company', None)
        company_instance = None
        if company_data:
            company_instance = Company.objects.create(**company_data)

        user = User.objects.create_user(
            username=username,
            email=validated_data.get('email'), 
            password=password
        )

        employer = Employer.objects.create(user=user, company=company_instance, **validated_data)
        
        employer.password = '' 
        employer.save()
        return employer


class EmployerLoginSerializer(serializers.Serializer):
    
    email = serializers.EmailField() 
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            # Authenticate using Django's built-in authentication system
            
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")
            
            if user.check_password(password): 
                if not hasattr(user, 'employer_profile'):
                    raise serializers.ValidationError("This user account is not associated with an employer profile.")
                
                return {
                    'user': user, 
                    'employer_id': user.employer_profile.id, 
                    'email': user.email,
                    'user_type': 'employer' 
                }
            else:
                raise serializers.ValidationError("Invalid credentials")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'")
