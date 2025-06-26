from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AdminViewSet, 
    EmployerViewSet, 
    JobSeekerViewSet, 
    JobViewSet, 
    JobApplicantViewSet
)

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'employers', EmployerViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'applications', JobApplicantViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('register/jobseeker/', JobSeekerViewSet.as_view({'post': 'register'}), name='jobseeker-register'),
    path('register/employer/', EmployerViewSet.as_view({'post': 'register'}), name='employer-register'),
    path('login/jobseeker/', JobSeekerViewSet.as_view({'post': 'login'}), name='jobseeker-login'),
    path('login/employer/', EmployerViewSet.as_view({'post': 'login'}), name='employer-login'),
]