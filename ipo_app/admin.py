from django.contrib import admin
from .models import IPO


@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    list_display = [
        'company_name', 'status', 'open_date', 'close_date', 
        'listing_date', 'ipo_price', 'listing_price', 'current_market_price',
        'listing_gain', 'current_return'
    ]
    list_filter = ['status', 'issue_type', 'open_date', 'close_date']
    search_fields = ['company_name', 'issue_type']
    ordering = ['-created_at']
    date_hierarchy = 'open_date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('company_name', 'logo', 'status', 'issue_type')
        }),
        ('Dates', {
            'fields': ('open_date', 'close_date', 'listing_date')
        }),
        ('Financial Information', {
            'fields': ('price_band', 'issue_size', 'ipo_price', 'listing_price', 'current_market_price')
        }),
        ('Documents', {
            'fields': ('rhp_pdf', 'drhp_pdf'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    def listing_gain(self, obj):
        return f"{obj.listing_gain}%" if obj.listing_gain else "N/A"
    listing_gain.short_description = "Listing Gain"
    
    def current_return(self, obj):
        return f"{obj.current_return}%" if obj.current_return else "N/A"
    current_return.short_description = "Current Return"
