from rest_framework import serializers
from .models import Admin, Employer, JobSeeker, Job, JobApplicant, Company

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class EmployerSerializer(serializers.ModelSerializer):
    company = CompanySerializer(required=False)
    
    class Meta:
        model = Employer
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        company_data = validated_data.pop('company', None)
        if company_data:
            company = Company.objects.create(**company_data)
            validated_data['company'] = company
        return Employer.objects.create(**validated_data)

class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeeker
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class JobApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplicant
        fields = '__all__'