from django.db import models

# Use FileField instead of ImageField to avoid Pillow dependency
from django.db.models import FileField as ImageField
IMAGE_FIELD_AVAILABLE = False


class Company(models.Model):
    """Company model to match your companies table"""
    id = models.AutoField(primary_key=True, db_column='company_id')
    company_name = models.CharField(max_length=255)
    company_logo = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'companies'
        
    def __str__(self):
        return self.company_name


class IPO(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('listed', 'Listed'),
    ]
    
    # Map to your existing database structure
    id = models.AutoField(primary_key=True, db_column='ipo_id')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, db_column='company_id')
    price_band = models.CharField(max_length=50)
    open_date = models.DateField()
    close_date = models.DateField()
    issue_size = models.CharField(max_length=100)
    issue_type = models.CharField(max_length=50)
    listing_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    
    # Price Information
    ipo_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    listing_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    current_market_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ipos'
        ordering = ['-created_at']
        verbose_name = "IPO"
        verbose_name_plural = "IPOs"

    @property
    def company_name(self):
        """Get company name from related company"""
        return self.company.company_name
    
    @property
    def logo(self):
        """Get company logo from related company"""
        return self.company.company_logo

    @property
    def listing_gain(self):
        """Calculate listing gain percentage"""
        if self.ipo_price and self.listing_price:
            return round(((float(self.listing_price) - float(self.ipo_price)) / float(self.ipo_price)) * 100, 2)
        return None

    @property
    def current_return(self):
        """Calculate current return percentage"""
        if self.ipo_price and self.current_market_price:
            return round(((float(self.current_market_price) - float(self.ipo_price)) / float(self.ipo_price)) * 100, 2)
        return None

    def __str__(self):
        return self.company.company_name


class Document(models.Model):
    """Document model to match your documents table"""
    id = models.AutoField(primary_key=True, db_column='document_id')
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE, db_column='ipo_id')
    rhp_pdf = models.CharField(max_length=255, null=True, blank=True)
    drhp_pdf = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'documents'
