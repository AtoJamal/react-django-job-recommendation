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



class JobSeekerRegistrationSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    middle_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100)
    age = serializers.IntegerField(required=False)
    gender = serializers.ChoiceField(choices=JobSeeker.GENDER_CHOICES)
    location = serializers.CharField(max_length=200)
    phone_number = serializers.CharField(max_length=20)
    email = serializers.EmailField()
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    degree = serializers.ChoiceField(choices=JobSeeker.DEGREE_CHOICES, required=False)
    experience = serializers.IntegerField(required=False)
    graduation_year = serializers.IntegerField(required=False)
    field_of_study = serializers.CharField(max_length=100, required=False)

    def validate(self, data):
        errors = {}
        
        # Check username uniqueness
        if User.objects.filter(username=data['username']).exists():
            errors['username'] = "This username is already taken."
        
        # Check email uniqueness
        if User.objects.filter(email=data['email']).exists():
            errors['email'] = "This email is already registered."
        
        # Check password length
        if len(data['password']) < 8:
            errors['password'] = "Password must be at least 8 characters long."
        
        # Check password confirmation
        if data['password'] != data['password2']:
            errors['password2'] = "Passwords do not match."
        
        # Check phone number format
        phone_number = data.get('phone_number', '')
        if phone_number:
            # Remove any non-digit characters except '+' at the start
            phone_number = ''.join(c for c in phone_number if c.isdigit() or (c == '+' and phone_number.index(c) == 0))
            if not phone_number or len(phone_number) < 2:  # Must have at least a '+' and one digit
                errors['phone_number'] = "Phone number must be in the format +1234567890."
            else:
                data['phone_number'] = phone_number
        
        # Validate degree choice
        if 'degree' in data and data['degree'] not in dict(JobSeeker.DEGREE_CHOICES):
            errors['degree'] = f"Invalid degree choice. Must be one of: {', '.join(dict(JobSeeker.DEGREE_CHOICES).keys())}"
        
        # Validate gender choice
        if 'gender' in data and data['gender'] not in dict(JobSeeker.GENDER_CHOICES):
            errors['gender'] = f"Invalid gender choice. Must be one of: {', '.join(dict(JobSeeker.GENDER_CHOICES).keys())}"
        
        if errors:
            raise serializers.ValidationError(errors)
            
        return data

    def create(self, validated_data):
        try:
            # Create user
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )

            # Create job seeker profile
            job_seeker = JobSeeker.objects.create(
                user=user,
                first_name=validated_data['first_name'],
                middle_name=validated_data.get('middle_name', ''),
                last_name=validated_data['last_name'],
                age=validated_data.get('age'),
                gender=validated_data['gender'],
                location=validated_data['location'],
                phone_number=validated_data['phone_number'],
                degree=validated_data.get('degree'),
                experience=validated_data.get('experience', 0),
                graduation_year=validated_data.get('graduation_year'),
                field_of_study=validated_data.get('field_of_study')
            )
            return job_seeker
            
        except Exception as e:
            # If anything fails, try to clean up the created user
            if 'user' in locals():
                user.delete()
            raise serializers.ValidationError(str(e))

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
    # Authenticate against Django's User model using username (or email) and password
    email = serializers.EmailField() # Or username, if that's what your users log in with
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
