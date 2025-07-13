from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import IPO, Company
from .serializers import IPOListSerializer, IPODetailSerializer, IPOCreateUpdateSerializer, CompanySerializer


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Company model - read-only operations
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class IPOViewSet(viewsets.ModelViewSet):
    """
    ViewSet for IPO model providing CRUD operations and filtering
    """
    queryset = IPO.objects.select_related('company').all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['company__company_name', 'issue_type']
    ordering_fields = ['open_date', 'close_date', 'listing_date', 'created_at', 'company__company_name']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Override to add custom filtering"""
        queryset = IPO.objects.select_related('company').all()
        
        # Filter by status
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        
        # Filter by company name
        company_name = self.request.query_params.get('company_name')
        if company_name:
            queryset = queryset.filter(company__company_name__icontains=company_name)
        
        # Filter by issue type
        issue_type = self.request.query_params.get('issue_type')
        if issue_type:
            queryset = queryset.filter(issue_type__icontains=issue_type)
        
        # Date range filters
        open_date_from = self.request.query_params.get('open_date_from')
        if open_date_from:
            queryset = queryset.filter(open_date__gte=open_date_from)
        
        open_date_to = self.request.query_params.get('open_date_to')
        if open_date_to:
            queryset = queryset.filter(open_date__lte=open_date_to)
        
        return queryset
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return IPOListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return IPOCreateUpdateSerializer
        else:
            return IPODetailSerializer
    
    def perform_create(self, serializer):
        """Override create to handle any additional logic"""
        serializer.save()
    
    def perform_update(self, serializer):
        """Override update to handle any additional logic"""
        serializer.save()
    
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """Get IPOs filtered by status"""
        status_param = request.query_params.get('status')
        if not status_param:
            return Response(
                {'error': 'Status parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        ipos = self.queryset.filter(status=status_param)
        serializer = IPOListSerializer(ipos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming IPOs"""
        ipos = self.queryset.filter(status='upcoming')
        serializer = IPOListSerializer(ipos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def ongoing(self, request):
        """Get ongoing IPOs"""
        ipos = self.queryset.filter(status='ongoing')
        serializer = IPOListSerializer(ipos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def listed(self, request):
        """Get listed IPOs"""
        ipos = self.queryset.filter(status='listed')
        serializer = IPOListSerializer(ipos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Custom search endpoint"""
        query = request.query_params.get('q', '')
        if not query:
            return Response(
                {'error': 'Search query parameter "q" is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        ipos = self.queryset.filter(
            Q(company__company_name__icontains=query) |
            Q(issue_type__icontains=query)
        )
        serializer = IPOListSerializer(ipos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get IPO statistics"""
        total_ipos = self.queryset.count()
        upcoming_count = self.queryset.filter(status='upcoming').count()
        ongoing_count = self.queryset.filter(status='ongoing').count()
        listed_count = self.queryset.filter(status='listed').count()
        
        return Response({
            'total_ipos': total_ipos,
            'upcoming': upcoming_count,
            'ongoing': ongoing_count,
            'listed': listed_count
        })
