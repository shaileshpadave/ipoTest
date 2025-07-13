import django_filters
from django.db import models
from .models import IPO


class IPOFilter(django_filters.FilterSet):
    """Filter class for IPO model"""
    
    # Date range filters
    open_date_from = django_filters.DateFilter(field_name='open_date', lookup_expr='gte')
    open_date_to = django_filters.DateFilter(field_name='open_date', lookup_expr='lte')
    close_date_from = django_filters.DateFilter(field_name='close_date', lookup_expr='gte')
    close_date_to = django_filters.DateFilter(field_name='close_date', lookup_expr='lte')
    listing_date_from = django_filters.DateFilter(field_name='listing_date', lookup_expr='gte')
    listing_date_to = django_filters.DateFilter(field_name='listing_date', lookup_expr='lte')
    
    # Price range filters
    ipo_price_min = django_filters.NumberFilter(field_name='ipo_price', lookup_expr='gte')
    ipo_price_max = django_filters.NumberFilter(field_name='ipo_price', lookup_expr='lte')
    current_price_min = django_filters.NumberFilter(field_name='current_market_price', lookup_expr='gte')
    current_price_max = django_filters.NumberFilter(field_name='current_market_price', lookup_expr='lte')
    
    # Text filters
    company_name = django_filters.CharFilter(field_name='company_name', lookup_expr='icontains')
    issue_type = django_filters.CharFilter(field_name='issue_type', lookup_expr='icontains')
    
    # Status filter
    status = django_filters.ChoiceFilter(choices=IPO.STATUS_CHOICES)
    
    class Meta:
        model = IPO
        fields = [
            'status', 'company_name', 'issue_type',
            'open_date_from', 'open_date_to', 
            'close_date_from', 'close_date_to',
            'listing_date_from', 'listing_date_to',
            'ipo_price_min', 'ipo_price_max',
            'current_price_min', 'current_price_max'
        ]
