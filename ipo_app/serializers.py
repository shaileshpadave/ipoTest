from rest_framework import serializers
from .models import IPO, Company, Document


class CompanySerializer(serializers.ModelSerializer):
    """Serializer for Company model"""
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'company_logo']


class IPOListSerializer(serializers.ModelSerializer):
    """Serializer for IPO list view with essential fields"""
    company_name = serializers.ReadOnlyField()
    logo = serializers.ReadOnlyField()
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company_name', 'logo', 'price_band', 'open_date', 
            'close_date', 'issue_size', 'issue_type', 'listing_date', 
            'status', 'ipo_price', 'listing_price', 'current_market_price',
            'listing_gain', 'current_return', 'created_at', 'updated_at'
        ]


class IPODetailSerializer(serializers.ModelSerializer):
    """Serializer for IPO detail view with all fields"""
    company_name = serializers.ReadOnlyField()
    logo = serializers.ReadOnlyField()
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()
    company_id = serializers.ReadOnlyField(source='company.id')
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company_id', 'company_name', 'logo', 'price_band', 'open_date', 
            'close_date', 'issue_size', 'issue_type', 'listing_date', 
            'status', 'ipo_price', 'listing_price', 'current_market_price',
            'listing_gain', 'current_return', 'created_at', 'updated_at'
        ]


class IPOCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating IPO instances"""
    
    class Meta:
        model = IPO
        fields = [
            'company', 'price_band', 'open_date', 
            'close_date', 'issue_size', 'issue_type', 'listing_date', 
            'status', 'ipo_price', 'listing_price', 'current_market_price'
        ]
    
    def validate(self, data):
        """Custom validation"""
        # Ensure close_date is after open_date
        if data.get('open_date') and data.get('close_date'):
            if data['close_date'] <= data['open_date']:
                raise serializers.ValidationError(
                    "Close date must be after open date."
                )
        
        # Ensure listing_date is after close_date if provided
        if data.get('close_date') and data.get('listing_date'):
            if data['listing_date'] <= data['close_date']:
                raise serializers.ValidationError(
                    "Listing date must be after close date."
                )
        
        return data
    
    def to_representation(self, instance):
        """Return detailed representation after create/update"""
        return IPODetailSerializer(instance, context=self.context).data
