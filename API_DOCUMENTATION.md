#!/usr/bin/env python3
"""
Database Setup Script for IPO Backend
Creates database schema and inserts sample data based on your PostgreSQL design
Works with both SQLite (Django default) and PostgreSQL
"""

import os
import sys
import django
from datetime import date, timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ipo_backend.settings')
django.setup()

from ipo_app.models import IPO


def create_sample_companies_and_ipos():
    """Create sample IPO data based on your schema design"""
    
    # Clear existing data
    IPO.objects.all().delete()
    print("🗑️  Cleared existing IPO data")
    
    # Sample IPO data based on your PostgreSQL schema
    sample_ipos = [
        # 📈 Listed IPOs (historical data - like Zomato, Paytm, Nykaa)
        {
            'company_name': 'Zomato Ltd',
            'price_band': '₹72-76',
            'open_date': date(2021, 7, 14),
            'close_date': date(2021, 7, 16),
            'issue_size': '₹9,375 Cr',
            'issue_type': 'Fresh Issue',
            'listing_date': date(2021, 7, 23),
            'status': 'listed',
            'ipo_price': 76.00,
            'listing_price': 115.00,
            'current_market_price': 145.50,
        },
        {
            'company_name': 'Paytm (One97 Communications)',
            'price_band': '₹2080-2150',
            'open_date': date(2021, 11, 8),
            'close_date': date(2021, 11, 10),
            'issue_size': '₹18,300 Cr',
            'issue_type': 'Fresh Issue',
            'listing_date': date(2021, 11, 18),
            'status': 'listed',
            'ipo_price': 2150.00,
            'listing_price': 1950.00,
            'current_market_price': 875.25,
        },
        {
            'company_name': 'Nykaa (FSN E-Commerce)',
            'price_band': '₹1085-1125',
            'open_date': date(2021, 10, 28),
            'close_date': date(2021, 11, 1),
            'issue_size': '₹5,352 Cr',
            'issue_type': 'Fresh Issue',
            'listing_date': date(2021, 11, 10),
            'status': 'listed',
            'ipo_price': 1125.00,
            'listing_price': 2001.00,
            'current_market_price': 1850.75,
        },
        {
            'company_name': 'MedTech Innovations Pvt Ltd',
            'price_band': '₹800-850',
            'open_date': date.today() - timedelta(days=30),
            'close_date': date.today() - timedelta(days=27),
            'issue_size': '₹2,800 Cr',
            'issue_type': 'Fresh Issue',
            'listing_date': date.today() - timedelta(days=20),
            'status': 'listed',
            'ipo_price': 825.00,
            'listing_price': 920.00,
            'current_market_price': 895.50,
        },
        {
            'company_name': 'Digital Banking Corp',
            'price_band': '₹95-110',
            'open_date': date.today() - timedelta(days=60),
            'close_date': date.today() - timedelta(days=57),
            'issue_size': '₹1,500 Cr',
            'issue_type': 'Fresh Issue',
            'listing_date': date.today() - timedelta(days=50),
            'status': 'listed',
            'ipo_price': 105.00,
            'listing_price': 128.00,
            'current_market_price': 142.75,
        },
        
        # 🔥 Ongoing IPOs (currently open for subscription)
        {
            'company_name': 'HDFC Bank Subsidiary',
            'price_band': '₹250-280',
            'open_date': date.today() - timedelta(days=1),
            'close_date': date.today() + timedelta(days=2),
            'issue_size': '₹12,000 Cr',
            'issue_type': 'Fresh Issue + OFS',
            'status': 'ongoing',
            'ipo_price': 265.00,
        },
        {
            'company_name': 'Bharti Airtel Tower Company',
            'price_band': '₹180-200',
            'open_date': date.today(),
            'close_date': date.today() + timedelta(days=3),
            'issue_size': '₹6,800 Cr',
            'issue_type': 'Fresh Issue',
            'status': 'ongoing',
            'ipo_price': 190.00,
        },
        {
            'company_name': 'AgriTech Solutions',
            'price_band': '₹45-55',
            'open_date': date.today() - timedelta(days=2),
            'close_date': date.today() + timedelta(days=1),
            'issue_size': '₹900 Cr',
            'issue_type': 'Fresh Issue',
            'status': 'ongoing',
            'ipo_price': 50.00,
        },
        
        # 🔜 Upcoming IPOs
        {
            'company_name': 'Reliance Retail Ventures',
            'price_band': '₹300-320',
            'open_date': date.today() + timedelta(days=7),
            'close_date': date.today() + timedelta(days=10),
            'issue_size': '₹15,000 Cr',
            'issue_type': 'OFS',
            'status': 'upcoming',
            'ipo_price': 310.00,
        },
        {
            'company_name': 'TCS Digital Services',
            'price_band': '₹450-480',
            'open_date': date.today() + timedelta(days=14),
            'close_date': date.today() + timedelta(days=17),
            'issue_size': '₹8,500 Cr',
            'issue_type': 'Fresh Issue',
            'status': 'upcoming',
            'ipo_price': 465.00,
        },
        {
            'company_name': 'Infosys Fintech Solutions',
            'price_band': '₹350-380',
            'open_date': date.today() + timedelta(days=21),
            'close_date': date.today() + timedelta(days=24),
            'issue_size': '₹10,500 Cr',
            'issue_type': 'Fresh Issue',
            'status': 'upcoming',
            'ipo_price': 365.00,
        },
        {
            'company_name': 'Green Energy Solutions Ltd',
            'price_band': '₹120-150',
            'open_date': date.today() + timedelta(days=30),
            'close_date': date.today() + timedelta(days=33),
            'issue_size': '₹4,200 Cr',
            'issue_type': 'Fresh Issue',
            'status': 'upcoming',
            'ipo_price': 135.00,
        },
        {
            'company_name': 'EV Motors India Ltd',
            'price_band': '₹600-650',
            'open_date': date.today() + timedelta(days=45),
            'close_date': date.today() + timedelta(days=48),
            'issue_size': '₹7,200 Cr',
            'issue_type': 'Fresh Issue + OFS',
            'status': 'upcoming',
            'ipo_price': 625.00,
        },
        {
            'company_name': 'FinTech Revolution Ltd',
            'price_band': '₹220-250',
            'open_date': date.today() + timedelta(days=35),
            'close_date': date.today() + timedelta(days=38),
            'issue_size': '₹3,600 Cr',
            'issue_type': 'Fresh Issue',
            'status': 'upcoming',
            'ipo_price': 235.00,
        },
        {
            'company_name': 'CloudTech Solutions',
            'price_band': '₹850-900',
            'open_date': date.today() + timedelta(days=60),
            'close_date': date.today() + timedelta(days=63),
            'issue_size': '₹5,800 Cr',
            'issue_type': 'Fresh Issue',
            'status': 'upcoming',
            'ipo_price': 875.00,
        },
        {
            'company_name': 'Renewable Power Corp',
            'price_band': '₹75-85',
            'open_date': date.today() + timedelta(days=50),
            'close_date': date.today() + timedelta(days=53),
            'issue_size': '₹2,100 Cr',
            'issue_type': 'OFS',
            'status': 'upcoming',
            'ipo_price': 80.00,
        }
    ]
    
    created_count = 0
    for ipo_data in sample_ipos:
        try:
            ipo = IPO.objects.create(**ipo_data)
            created_count += 1
            
            # Print with status emoji
            status_emoji = {
                'upcoming': '🔜',
                'ongoing': '🔥',
                'listed': '📈'
            }
            emoji = status_emoji.get(ipo.status, '📊')
            
            # Show calculated returns for listed IPOs
            if ipo.status == 'listed' and ipo.listing_gain:
                print(f"{emoji} {ipo.company_name} ({ipo.status}) - Listing Gain: {ipo.listing_gain:+.1f}%")
            else:
                print(f"{emoji} {ipo.company_name} ({ipo.status})")
            
        except Exception as e:
            print(f"❌ Error creating {ipo_data['company_name']}: {e}")
    
    return created_count


def print_statistics():
    """Print database statistics"""
    total_ipos = IPO.objects.count()
    upcoming_count = IPO.objects.filter(status='upcoming').count()
    ongoing_count = IPO.objects.filter(status='ongoing').count()
    listed_count = IPO.objects.filter(status='listed').count()
    
    print(f"\n📊 Database Statistics:")
    print(f"   Total IPOs: {total_ipos}")
    print(f"   🔜 Upcoming: {upcoming_count}")
    print(f"   🔥 Ongoing: {ongoing_count}")
    print(f"   📈 Listed: {listed_count}")
    
    # Show calculated returns for listed IPOs
    listed_ipos = IPO.objects.filter(status='listed', ipo_price__isnull=False)
    if listed_ipos.exists():
        print(f"\n💰 Performance Summary (Listed IPOs):")
        for ipo in listed_ipos:
            if ipo.listing_gain:
                listing_str = f"{ipo.listing_gain:+.1f}%"
                current_str = f"{ipo.current_return:+.1f}%" if ipo.current_return else "N/A"
                print(f"   {ipo.company_name}:")
                print(f"     📈 Listing Gain: {listing_str}")
                print(f"     💵 Current Return: {current_str}")
    
    # Show price ranges
    print(f"\n💰 Price Band Analysis:")
    price_ranges = IPO.objects.values_list('company_name', 'price_band', 'status').order_by('status')
    for company, price_band, status in price_ranges[:8]:  # Show first 8
        status_emoji = {'upcoming': '🔜', 'ongoing': '🔥', 'listed': '📈'}.get(status, '📊')
        print(f"   {status_emoji} {company}: {price_band}")


def print_api_examples():
    """Print API usage examples"""
    print(f"\n🚀 Your IPO API is ready!")
    print(f"   🌐 Base URL: http://127.0.0.1:8000/api/ipo/")
    print(f"   🔧 Admin Panel: http://127.0.0.1:8000/admin/")
    
    print(f"\n📋 API Examples:")
    print(f"   # Get all IPOs")
    print(f"   curl http://127.0.0.1:8000/api/ipo/")
    print(f"   ")
    print(f"   # Get upcoming IPOs")
    print(f"   curl http://127.0.0.1:8000/api/ipo/upcoming/")
    print(f"   ")
    print(f"   # Get ongoing IPOs")
    print(f"   curl http://127.0.0.1:8000/api/ipo/ongoing/")
    print(f"   ")
    print(f"   # Get listed IPOs")
    print(f"   curl http://127.0.0.1:8000/api/ipo/listed/")
    print(f"   ")
    print(f"   # Search IPOs")
    print(f"   curl \"http://127.0.0.1:8000/api/ipo/search/?q=tech\"")
    print(f"   ")
    print(f"   # Filter by status")
    print(f"   curl \"http://127.0.0.1:8000/api/ipo/?status=ongoing\"")
    print(f"   ")
    print(f"   # Get statistics")
    print(f"   curl http://127.0.0.1:8000/api/ipo/stats/")
    
    print(f"\n🎯 Frontend Integration:")
    print(f"   // JavaScript fetch example")
    print(f"   fetch('http://127.0.0.1:8000/api/ipo/ongoing/')")
    print(f"     .then(response => response.json())")
    print(f"     .then(data => console.log(data));")


def main():
    print("🏗️  Setting up IPO Database with Sample Data...")
    print("="*60)
    print("📋 Based on your PostgreSQL schema design")
    print("💾 Using Django ORM with SQLite (can easily switch to PostgreSQL)")
    print()
    
    try:
        # Create sample data
        created_count = create_sample_companies_and_ipos()
        
        print(f"\n🎉 Successfully created {created_count} IPO records!")
        
        # Print statistics
        print_statistics()
        
        # Print API examples
        print_api_examples()
        
        print(f"\n📚 What's included:")
        print(f"   ✅ Real IPO data (Zomato, Paytm, Nykaa)")
        print(f"   ✅ Fictional ongoing IPOs for testing")
        print(f"   ✅ Upcoming IPOs with future dates")
        print(f"   ✅ Calculated listing gains and returns")
        print(f"   ✅ Various price bands and issue types")
        print(f"   ✅ Multiple IPO statuses")
        
        print(f"\n🔧 Next Steps:")
        print(f"   1. Start server: python manage.py runserver")
        print(f"   2. Visit API: http://127.0.0.1:8000/api/ipo/")
        print(f"   3. Create admin user: python manage.py createsuperuser")
        print(f"   4. Explore admin: http://127.0.0.1:8000/admin/")
        
        print(f"\n🗄️  Database Schema Info:")
        print(f"   📁 Current: SQLite (db.sqlite3)")
        print(f"   🔄 To switch to PostgreSQL:")
        print(f"      - Update DATABASES in settings.py")
        print(f"      - Run setup_postgresql_database.py")
        print(f"      - Install: pip install psycopg2-binary")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Make sure you have run migrations first:")
        print("   python manage.py makemigrations")
        print("   python manage.py migrate")


if __name__ == "__main__":
    main()
