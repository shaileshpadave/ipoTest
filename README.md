# IPO Backend API

A Django REST API for managing IPO (Initial Public Offering) data with comprehensive filtering, search, and CRUD operations.

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### 1. Setup Virtual Environment (Recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
```bash
cp .env.example .env
# Edit .env file with your configuration
```

### 4. Run Setup Script
```bash
python setup_backend.py
```

### 5. Create Sample Data (Optional)
```bash
python create_sample_data.py
```

### 6. Start Development Server
```bash
python manage.py runserver
```

The API will be available at: `http://127.0.0.1:8000/api/`

## 📋 API Endpoints

### Main Endpoints
- `GET /api/ipo/` - List all IPOs (with filtering & search)
- `POST /api/ipo/` - Create new IPO
- `GET /api/ipo/{id}/` - Get IPO details
- `PUT /api/ipo/{id}/` - Update IPO
- `DELETE /api/ipo/{id}/` - Delete IPO

### Special Endpoints
- `GET /api/ipo/upcoming/` - Get upcoming IPOs
- `GET /api/ipo/ongoing/` - Get ongoing IPOs
- `GET /api/ipo/listed/` - Get listed IPOs
- `GET /api/ipo/search/?q=term` - Search IPOs
- `GET /api/ipo/stats/` - Get statistics

## 🔍 Features

### Filtering & Search
- Filter by status, dates, price ranges
- Search by company name and issue type
- Sort by any field (ascending/descending)
- Pagination support

### Data Management
- Complete CRUD operations
- File uploads (logos, documents)
- Automatic calculation of returns
- Data validation

### Admin Interface
- Django admin at `/admin/`
- Easy data management
- Bulk operations

## 📊 Sample Usage

### Get All IPOs
```bash
curl http://127.0.0.1:8000/api/ipo/
```

### Get Upcoming IPOs
```bash
curl http://127.0.0.1:8000/api/ipo/upcoming/
```

### Search IPOs
```bash
curl "http://127.0.0.1:8000/api/ipo/search/?q=tech"
```

### Filter by Status and Date
```bash
curl "http://127.0.0.1:8000/api/ipo/?status=listed&open_date_from=2024-01-01"
```

### Create New IPO
```bash
curl -X POST http://127.0.0.1:8000/api/ipo/ \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "New Tech Corp",
    "price_band": "₹200-250",
    "open_date": "2024-12-20",
    "close_date": "2024-12-23",
    "issue_size": "₹1000 Cr",
    "issue_type": "Fresh Issue",
    "status": "upcoming",
    "ipo_price": 225.0
  }'
```

## 📁 Django Files Explained (For Beginners)

### Main Project Files
```
manage.py               # 🔧 Django's command-line tool (run migrations, start server)
requirements.txt        # 📦 List of Python packages to install
.env                   # 🔐 Secret settings (passwords, keys) - don't share!
```

### Project Directory (`ipo_backend/`)
```
ipo_backend/
├── __init__.py        # 📁 Makes this a Python package (usually empty)
├── settings.py        # ⚙️  Main configuration (database, apps, security)
├── urls.py           # 🛣️  Main URL routing (which URLs go where)
├── wsgi.py           # 🌐 Web server configuration (for deployment)
└── asgi.py           # ⚡ Async server configuration (for real-time features)
```

### App Directory (`ipo_app/`)
```
ipo_app/
├── __init__.py        # 📁 Makes this a Python package
├── models.py         # 🗃️  Database structure (IPO data fields)
├── views.py          # 🎯 Business logic (what happens when API is called)
├── urls.py           # 🛣️  App-specific URL routing
├── serializers.py    # 🔄 Convert data between Python and JSON
├── admin.py          # 👨‍💼 Django admin panel configuration
├── apps.py           # 📱 App configuration
└── filters.py        # 🔍 Search and filter logic
```

### Key Concepts
- **Models** = Database tables (what data looks like)
- **Views** = Controllers (what happens when someone visits URL)
- **URLs** = Routes (which URL calls which view)
- **Serializers** = Data formatters (Python ↔ JSON)
- **Admin** = Built-in management interface

## 🔄 How Django Works (Simple Flow)

```
1. User visits URL → 2. urls.py finds matching view → 3. views.py processes request
                                                          ↓
4. Response sent back ← 5. Serializer formats data ← 6. models.py gets data from database
```

**Example:** User visits `/api/ipo/`
1. `ipo_backend/urls.py` → routes to `ipo_app/urls.py`
2. `ipo_app/urls.py` → calls `IPOViewSet` in `views.py`
3. `views.py` → gets IPO data from `models.py`
4. `serializers.py` → converts data to JSON
5. JSON response sent to user

## 🛠️ Development

### Project Structure
```
ipo_backend/
├── ipo_backend/          # Main Django project
│   ├── settings.py      # Django settings
│   ├── urls.py          # Main URL configuration
│   └── ...
├── ipo_app/             # IPO application
│   ├── models.py        # Data models
│   ├── serializers.py   # API serializers
│   ├── views.py         # API views
│   ├── urls.py          # App URLs
│   ├── admin.py         # Admin configuration
│   └── filters.py       # Custom filters
├── manage.py            # Django management script
├── requirements.txt     # Python dependencies
└── ...
```

### Running Tests
```bash
python manage.py test
```

### Django Commands Cheat Sheet
```bash
# Start development server
python manage.py runserver

# Create migrations (after changing models.py)
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Open Django shell (interactive Python with Django)
python manage.py shell

# Check for issues
python manage.py check

# Collect static files (for production)
python manage.py collectstatic
```

### Making Migrations
```bash
python manage.py test
```

### Making Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Superuser
```bash
python manage.py createsuperuser
```

## 🔧 Configuration

### Environment Variables (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Database
- Default: SQLite (for development)
- Production: PostgreSQL recommended

## 📚 Documentation
- [API Documentation](API_DOCUMENTATION.md)
- Django REST Framework: https://www.django-rest-framework.org/

## 🚢 Deployment

### Production Checklist
1. Set `DEBUG=False`
2. Configure proper `SECRET_KEY`
3. Set up PostgreSQL database
4. Configure static file serving
5. Set up proper CORS origins
6. Use environment variables for sensitive data

### Docker Deployment (Optional)
Create `Dockerfile` and `docker-compose.yml` for containerized deployment.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

---

**Happy coding! 🎉**
