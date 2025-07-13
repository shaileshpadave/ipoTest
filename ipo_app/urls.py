from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IPOViewSet

# Create a router and register our viewset
router = DefaultRouter()
router.register(r'ipo', IPOViewSet, basename='ipo')

urlpatterns = [
    path('', include(router.urls)),
]
