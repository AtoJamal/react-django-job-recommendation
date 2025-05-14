
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, EmployerViewSet, JobSeekerViewSet, JobViewSet, JobApplicantViewSet

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'employers', EmployerViewSet)
router.register(r'jobseekers', JobSeekerViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'applications', JobApplicantViewSet)

urlpatterns = [
    path('', include(router.urls)),
]