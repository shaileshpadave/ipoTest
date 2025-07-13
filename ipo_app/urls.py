from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IPOViewSet, CompanyViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'ipo', IPOViewSet, basename='ipo')
router.register(r'companies', CompanyViewSet, basename='company')

urlpatterns = [
    path('', include(router.urls)),
]
